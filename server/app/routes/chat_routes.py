from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from sqlalchemy import asc

from .. import db
from ..models import ChatMessage, User
from ..services.chat_service import generate_ai_response


chat_bp = Blueprint("chat", __name__)


@chat_bp.route("/messages", methods=["GET"])
@jwt_required()
def get_messages():
    user_id = int(get_jwt_identity())
    messages = (
        ChatMessage.query.filter_by(user_id=user_id)
        .order_by(asc(ChatMessage.created_at))
        .all()
    )
    return jsonify({"messages": [message.to_dict() for message in messages]})


@chat_bp.route("/send", methods=["POST"])
@jwt_required()
def send_message():
    user_id = int(get_jwt_identity())
    payload = request.get_json() or {}
    user_message = (payload.get("message") or "").strip()

    if not user_message:
        return jsonify({"error": "message is required"}), 400

    if User.query.get(user_id) is None:
        return jsonify({"error": "user not found"}), 404

    history = (
        ChatMessage.query.filter_by(user_id=user_id)
        .order_by(asc(ChatMessage.created_at))
        .all()
    )

    ai_response = generate_ai_response(
        user_message,
        [{"role": item.role, "content": item.content} for item in history],
    )

    user_entry = ChatMessage(user_id=user_id, role="user", content=user_message)
    ai_entry = ChatMessage(user_id=user_id, role="assistant", content=ai_response)

    db.session.add_all([user_entry, ai_entry])
    db.session.commit()

    return jsonify(
        {
            "user_message": user_entry.to_dict(),
            "ai_message": ai_entry.to_dict(),
        }
    ), 201


@chat_bp.route("/clear", methods=["DELETE"])
@jwt_required()
def clear_messages():
    user_id = int(get_jwt_identity())
    deleted = ChatMessage.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({"cleared": deleted})