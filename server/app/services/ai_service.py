"""AI service for generating sustainability insights."""
import os


def generate_insights(data):
    """
    Generate sustainability insights for a product.
    For now, returns mock insights. Can be enhanced with OpenAI later.
    """
    product_title = data.get('title', 'Unknown Product')
    
    # Mock insights - can be replaced with actual OpenAI call
    insights = {
        'carbon_footprint': 'Low',
        'recyclability': 'High',
        'sustainability_score': 85,
        'recommendations': [
            'This product uses sustainable materials',
            'Consider local pickup to reduce shipping emissions',
            'Excellent choice for eco-conscious consumers'
        ],
        'impact': {
            'co2_saved': '2.5 kg',
            'waste_reduced': '1.2 kg',
            'trees_saved': 0.05
        }
    }
    
    return insights


# Optional: Add OpenAI integration when ready
def generate_insights_with_openai(data):
    """
    Generate insights using OpenAI API.
    Requires OPENAI_API_KEY in environment.
    """
    api_key = os.getenv('OPENAI_API_KEY')
    
    if not api_key:
        return generate_insights(data)  # Fallback to mock
    
    # OpenAI implementation can be added here
    # For now, return mock data
    return generate_insights(data)
