from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from .ai_service import generate_user_insights

insight_bp = Blueprint('insights', __name__)


@insight_bp.post('/')
@jwt_required()
def analyze():
    """Generate sustainability insights for the authenticated user."""
    data = request.get_json() or {}
    timeframe_days = data.get('timeframe_days')

    try:
        user_id = int(get_jwt_identity())
    except (TypeError, ValueError):
        return jsonify({'error': 'Invalid user identity'}), 400

    insights = generate_user_insights(user_id=user_id, timeframe_days=timeframe_days)
    return jsonify({'insights': insights})
