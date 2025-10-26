from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .. import db
from ..models import Product

product_bp = Blueprint('products', __name__)


@product_bp.route('/', methods=['GET'])
def get_products():
    """Get all products."""
    products = Product.query.order_by(Product.created_at.desc()).all()
    return jsonify({'items': [p.to_dict() for p in products]})


@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a single product by ID."""
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())


@product_bp.route('/', methods=['POST'])
@jwt_required()
def create_product():
    """Create a new product listing."""
    user_id = get_jwt_identity()
    data = request.get_json() or {}

    if not data.get('title'):
        return jsonify({'error': 'title is required'}), 400

    product = Product(
        title=data.get('title'),
        description=data.get('description', ''),
        price=float(data.get('price', 0)),
        condition=data.get('condition'),
        category=data.get('category'),
        location=data.get('location'),
        image_url=data.get('image_url'),
        is_donation=data.get('is_donation', False),
        owner_id=user_id
    )

    db.session.add(product)
    db.session.commit()

    return jsonify(product.to_dict()), 201


@product_bp.route('/<int:product_id>', methods=['PUT'])
@jwt_required()
def update_product(product_id):
    """Update a product."""
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    # Check ownership
    if product.owner_id != user_id:
        return jsonify({'error': 'unauthorized'}), 403

    data = request.get_json() or {}

    # Update fields
    if 'title' in data:
        product.title = data['title']
    if 'description' in data:
        product.description = data['description']
    if 'price' in data:
        product.price = float(data['price'])
    if 'condition' in data:
        product.condition = data['condition']
    if 'category' in data:
        product.category = data['category']
    if 'location' in data:
        product.location = data['location']
    if 'image_url' in data:
        product.image_url = data['image_url']

    db.session.commit()
    return jsonify(product.to_dict())


@product_bp.route('/<int:product_id>', methods=['DELETE'])
@jwt_required()
def delete_product(product_id):
    """Delete a product."""
    user_id = get_jwt_identity()
    product = Product.query.get_or_404(product_id)

    # Check ownership
    if product.owner_id != user_id:
        return jsonify({'error': 'unauthorized'}), 403

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'product deleted'}), 200
