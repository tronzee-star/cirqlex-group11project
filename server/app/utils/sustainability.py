"""Utility helpers for estimating sustainability impact metrics."""
from __future__ import annotations

from typing import Any

# Baseline CO2 savings in kilograms for a typical circular purchase
_BASELINE_SAVINGS_KG = 1.8

# Multipliers tuned from average lifecycle assessments for different product categories
_CATEGORY_FACTORS: dict[str, float] = {
    "electronics": 1.6,
    "furniture": 1.8,
    "clothing": 1.4,
    "footwear": 1.3,
    "home & living": 1.5,
    "education": 1.1,
    "lifestyle": 1.2,
}

# Condition multipliers – better condition items avoid more emissions by delaying new production
_CONDITION_FACTORS: dict[str, float] = {
    "new": 1.0,
    "brand new": 1.0,
    "used - like new": 1.4,
    "used - good": 1.3,
    "used": 1.2,
    "pre-loved": 1.25,
}

_DONATION_BONUS = 1.3  # donations often displace a full purchase


def _normalise_key(value: Any) -> str:
    if not isinstance(value, str):
        return ""
    return value.strip().lower()


def estimate_product_co2_per_purchase(product: Any) -> float:
    """Estimate kilograms of CO2 saved when this product is reused once.

    The heuristic leans on product metadata so it remains deterministic and cheap
    to compute without additional data sources.
    """

    if product is None:
        return 0.0

    category_factor = _CATEGORY_FACTORS.get(_normalise_key(getattr(product, "category", "")), 1.0)
    condition_factor = _CONDITION_FACTORS.get(_normalise_key(getattr(product, "condition", "")), 1.1)

    value = _BASELINE_SAVINGS_KG * category_factor * condition_factor
    if getattr(product, "is_donation", False):
        value *= _DONATION_BONUS

    return max(round(value, 2), 0.0)
