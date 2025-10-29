import logging
import os
from typing import Dict, Iterable, List

import requests

SYSTEM_PROMPT = (
    "You are Eco AI, a friendly sustainability assistant for CirqleX. "
    "Provide actionable, upbeat guidance about circular economy, sustainable sourcing, "
    "recycling, and eco-friendly living. Keep answers concise, practical, and positive."
)

_logger = logging.getLogger(__name__)
OPENAI_URL = "https://api.openai.com/v1/chat/completions"


def build_conversation(history: Iterable[Dict[str, str]], user_message: str) -> List[Dict[str, str]]:
    messages: List[Dict[str, str]] = [{"role": "system", "content": SYSTEM_PROMPT}]
    for message in history:
        role = message.get("role")
        content = (message.get("content") or "").strip()
        if role in {"user", "assistant"} and content:
            messages.append({"role": role, "content": content})
    messages.append({"role": "user", "content": user_message})
    return messages


def generate_ai_response(user_message: str, history: Iterable[Dict[str, str]]) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    conversation = build_conversation(history, user_message)

    if not api_key:
        return (
            "I'm running in demo mode right now. Once an OpenAI API key is configured, "
            "I'll be able to provide richer sustainability guidance."
        )

    model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")

    try:
        resp = requests.post(
            OPENAI_URL,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            },
            json={
                "model": model,
                "messages": conversation,
                "temperature": 0.5,
                "max_tokens": 400,
            },
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        choice = data["choices"][0]
        message = choice.get("message", {})
        return (message.get("content") or "").strip()
    except Exception as exc:  # pragma: no cover - defensive
        _logger.exception("Failed to generate AI response: %s", exc)
        return (
            "I couldn't reach the AI service at the moment. Please verify your OpenAI credentials "
            "and try again shortly."
        )