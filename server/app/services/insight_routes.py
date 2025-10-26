from flask import Blueprint, request, jsonify
from .ai_service import generate_insights

insight_bp = Blueprint('insights', __name__)


@insight_bp.post('/')
def analyze():
    """Generate sustainability insights for a product."""
    data = request.get_json() or {}
    insights = generate_insights(data)
    return jsonify({'insights': insights})
