"""AI service for generating sustainability insights."""
import json
import logging
import os
from collections import Counter
from datetime import datetime, timedelta
from typing import Iterable, Optional, Sequence

import requests
from sqlalchemy.orm import joinedload

from ..models import Order

IMPACT_CO2_PER_CIRCULAR_ORDER = 2.5
IMPACT_WASTE_PER_ORDER = 0.8
IMPACT_TREES_PER_CIRCULAR_ORDER = 0.05

OPENAI_URL = "https://api.openai.com/v1/chat/completions"

_logger = logging.getLogger(__name__)


def _is_circular_purchase(order: Order) -> bool:
    product = order.product
    if product is None:
        return False
    if getattr(product, "is_donation", False):
        return True
    condition = (product.condition or "").lower()
    return condition not in {"new", "brand new"}


def _format_kg(value: float) -> str:
    return f"{max(value, 0):.1f} kg"


def generate_user_insights(
    user_id: int,
    timeframe_days: Optional[int] = 180,
    orders: Optional[Sequence[Order]] = None,
) -> dict:
    """Build a sustainability impact summary for a specific user."""

    if not user_id:
        _logger.warning("generate_user_insights called without a user_id")
        return _empty_insights()

    orders_list: list[Order]
    if orders is None:
        query = Order.query.filter(Order.buyer_id == user_id)

        if timeframe_days and timeframe_days > 0:
            start_date = datetime.utcnow() - timedelta(days=timeframe_days)
            query = query.filter(Order.purchased_at >= start_date)

        orders_list = query.options(joinedload(Order.product)).all()
    else:
        orders_list = list(orders)
        if timeframe_days and timeframe_days > 0:
            start_date = datetime.utcnow() - timedelta(days=timeframe_days)
            orders_list = [
                order
                for order in orders_list
                if getattr(order, "purchased_at", None) is None
                or order.purchased_at >= start_date
            ]

        # ensure product relationship is available when reusing pre-fetched orders
        for order in orders_list:
            if not hasattr(order, "product"):
                db_order = Order.query.options(joinedload(Order.product)).get(order.id)
                if db_order:
                    order.product = db_order.product

    if not orders_list:
        return _empty_insights()

    total_orders = len(orders_list)
    total_spent = sum(order.price or 0 for order in orders_list)
    circular_orders = sum(1 for order in orders_list if _is_circular_purchase(order))
    reuse_rate = (circular_orders / total_orders) * 100 if total_orders else 0
    average_order_value = (total_spent / total_orders) if total_orders else 0

    categories = Counter(
        (order.product.category or "General") if order.product else "General"
        for order in orders_list
    )
    top_category, top_category_count = ("", 0)
    if categories:
        top_category, top_category_count = categories.most_common(1)[0]

    co2_saved = circular_orders * IMPACT_CO2_PER_CIRCULAR_ORDER
    waste_reduced = total_orders * IMPACT_WASTE_PER_ORDER
    trees_saved = circular_orders * IMPACT_TREES_PER_CIRCULAR_ORDER

    sustainability_score = min(
        100,
        round(40 + reuse_rate * 0.4 + min(circular_orders * 5, 30)),
    )

    recommendations: list[str] = []
    if reuse_rate < 40:
        recommendations.append(
            "Try opting for pre-loved or upcycled items to boost your reuse rate."
        )
    if average_order_value > 0:
        recommendations.append(
            f"Keep supporting circular purchases—your average order value is {average_order_value:.0f} KES."
        )
    if top_category and top_category_count >= max(2, total_orders // 3):
        recommendations.append(
            f"You make a big impact in {top_category.lower()}—explore related eco swaps to go further."
        )
    if not recommendations:
        recommendations.append(
            "Great job staying sustainable! Share your impact with friends to inspire them."
        )

    insights = {
        "sustainability_score": sustainability_score,
        "metrics": {
            "orders_analyzed": total_orders,
            "reuse_rate_pct": round(reuse_rate, 1),
            "average_order_value": round(average_order_value, 2),
            "circular_purchases": circular_orders,
            "timeframe_days": timeframe_days or None,
        },
        "impact": {
            "co2_saved": _format_kg(co2_saved),
            "waste_reduced": _format_kg(waste_reduced),
            "trees_saved": round(trees_saved, 2),
        },
        "recommendations": recommendations,
    }

    ai_summary = _generate_ai_summary(insights, orders_list)
    insights["ai"] = ai_summary

    return insights


def _empty_insights() -> dict:
    return {
        "sustainability_score": 0,
        "metrics": {
            "orders_analyzed": 0,
            "reuse_rate_pct": 0,
            "average_order_value": 0,
            "circular_purchases": 0,
            "timeframe_days": None,
        },
        "impact": {
            "co2_saved": "0.0 kg",
            "waste_reduced": "0.0 kg",
            "trees_saved": 0,
        },
        "recommendations": [
            "Make your first circular purchase to start building an impact profile.",
            "Browse community favourites for easy eco-friendly wins.",
        ],
        "ai": {
            "environmental_impact": None,
            "recommended_actions": [],
        },
    }


def _generate_ai_summary(insights: dict, orders: Iterable[Order]) -> dict:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return {
            "environmental_impact": None,
            "recommended_actions": [],
        }

    model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")

    sample_orders = []
    for order in list(orders)[:5]:
        product = getattr(order, "product", None)
        sample_orders.append(
            {
                "title": getattr(product, "title", None),
                "category": getattr(product, "category", None),
                "price": float(order.price or 0),
                "purchased_at": order.purchased_at.isoformat() if order.purchased_at else None,
                "is_circular": _is_circular_purchase(order),
            }
        )

    payload = {
        "metrics": insights.get("metrics", {}),
        "impact": insights.get("impact", {}),
        "sample_orders": sample_orders,
        "recommendations": insights.get("recommendations", []),
    }

    user_prompt = (
        "Using the sustainability data provided, craft a concise summary (max 2 sentences) "
        "highlighting the user's positive environmental impact. Then list three actionable, "
        "localised tips the user can follow next. Respond strictly as JSON with the shape:\n"
        '{"environmentalImpact": "...", "recommendedActions": ["tip 1", "tip 2", "tip 3"]}.\n'
        "Data:\n"
        + json.dumps(payload, ensure_ascii=False)
    )

    try:
        response = requests.post(
            OPENAI_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": [
                    {
                        "role": "system",
                        "content": (
                            "You are Eco AI helping summarise sustainability performance. "
                            "Keep tone encouraging and practical."
                        ),
                    },
                    {"role": "user", "content": user_prompt},
                ],
                "temperature": 0.6,
                "max_tokens": 300,
            },
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
        message = data["choices"][0]["message"]["content"].strip()
        summary = _parse_json_block(message)
        if not isinstance(summary, dict):
            raise ValueError("OpenAI summary response was not a JSON object")
        return {
            "environmental_impact": summary.get("environmentalImpact"),
            "recommended_actions": summary.get("recommendedActions") or [],
        }
    except Exception as exc:  # pragma: no cover - defensive
        _logger.exception("Failed to build AI sustainability summary: %s", exc)
        return {
            "environmental_impact": None,
            "recommended_actions": [],
        }


def _parse_json_block(raw_text: str) -> Optional[dict]:
    """Extract JSON object from a completion that may include code fences."""

    text = raw_text.strip()
    if text.startswith("```"):
        lines = text.splitlines()
        # drop opening fence and optional language tag
        if lines:
            lines = lines[1:]
        if lines and lines[0].strip().lower() in {"json", "javascript"}:
            lines = lines[1:]
        # drop closing fence if present
        if lines and lines[-1].strip().startswith("```"):
            lines = lines[:-1]
        text = "\n".join(lines).strip()

    if not text:
        return None

    return json.loads(text)
