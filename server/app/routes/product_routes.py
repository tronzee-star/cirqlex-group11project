from datetime import datetime

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from .. import db
from ..models import Product, Order, User

product_bp = Blueprint('products', __name__)


@product_bp.route('/', methods=['GET'])
def get_products():
    """Get all products."""
    products = Product.query.order_by(Product.created_at.desc()).all()
    return jsonify({'items': [p.to_dict() for p in products]})


@product_bp.route('/mine', methods=['GET'])
@jwt_required()
def get_my_products():
    """Get listings created by current user."""
    identity = get_jwt_identity()
    try:
        user_id = int(identity)
    except (TypeError, ValueError):
        return jsonify({'error': 'unauthorized'}), 403

    products = Product.query.filter_by(owner_id=user_id).order_by(Product.created_at.desc()).all()
    return jsonify({'items': [p.to_dict() for p in products]})


@product_bp.route('/stats', methods=['GET'])
@jwt_required()
def get_product_stats():
    """Return aggregated stats for the current user."""
    identity = get_jwt_identity()
    try:
        user_id = int(identity)
    except (TypeError, ValueError):
        return jsonify({'error': 'unauthorized'}), 403

    total_listings = Product.query.filter_by(owner_id=user_id).count()
    total_sales_q = db.session.query(db.func.count(Order.id)).join(Product).filter(Product.owner_id == user_id)
    total_sales = total_sales_q.scalar() or 0

    revenue_q = (
        db.session.query(db.func.coalesce(db.func.sum(Order.price), 0.0))
        .join(Product)
        .filter(Product.owner_id == user_id)
    )
    total_revenue = revenue_q.scalar() or 0.0

    buyer_orders = Order.query.filter_by(buyer_id=user_id).order_by(Order.purchased_at.desc()).all()
    purchases_count = len(buyer_orders)
    purchases_total = sum(order.price for order in buyer_orders)

    return jsonify({
        'listings': total_listings,
        'sales': total_sales,
        'revenue': total_revenue,
        'purchases_count': purchases_count,
        'purchases_total': purchases_total,
        'recent_orders': [order.to_dict(include_product=True) for order in buyer_orders],
    })


@product_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_my_orders():
    """Orders placed by the current user."""
    identity = get_jwt_identity()
    try:
        user_id = int(identity)
    except (TypeError, ValueError):
        return jsonify({'error': 'unauthorized'}), 403
    orders = Order.query.filter_by(buyer_id=user_id).order_by(Order.purchased_at.desc()).all()
    return jsonify({'items': [order.to_dict(include_product=True) for order in orders]})


@product_bp.route('/orders', methods=['POST'])
@jwt_required()
def create_orders():
    identity = get_jwt_identity()
    try:
        buyer_id = int(identity)
    except (TypeError, ValueError):
        return jsonify({'error': 'unauthorized'}), 403

    payload = request.get_json() or {}
    items = payload.get('items')

    if not isinstance(items, list) or not items:
        return jsonify({'error': 'items array is required'}), 400

    created_orders = []

    try:
        for item in items:
            try:
                product_id = int(item.get('product_id') or item.get('id'))
            except (TypeError, ValueError):
                return jsonify({'error': 'invalid product_id'}), 400

            product = Product.query.get(product_id)
            if not product:
                return jsonify({'error': f'product {product_id} not found'}), 404

            try:
                quantity = max(int(item.get('quantity', 1)), 1)
            except (TypeError, ValueError):
                quantity = 1

            try:
                price_value = float(item.get('price_value', product.price or 0))
            except (TypeError, ValueError):
                price_value = float(product.price or 0)

            total_price = price_value * quantity

            order = Order(
                buyer_id=buyer_id,
                product_id=product.id,
                price=total_price,
                purchased_at=datetime.utcnow(),
            )
            db.session.add(order)
            created_orders.append(order)

        db.session.commit()
    except Exception as exc:
        db.session.rollback()
        return jsonify({'error': 'failed to create orders', 'details': str(exc)}), 500

    return jsonify({'orders': [order.to_dict(include_product=True) for order in created_orders]}), 201


@product_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get a single product by ID."""
    product = Product.query.get_or_404(product_id)
    return jsonify(product.to_dict())


@product_bp.route('/', methods=['POST'])
def create_product():
    """Create a new product listing."""
    data = request.get_json() or {}

    if not data.get('title'):
        return jsonify({'error': 'title is required'}), 400

    # Try to get authenticated user, otherwise use demo user
    try:
        from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
        verify_jwt_in_request(optional=True)
        identity = get_jwt_identity()
        user_id = int(identity) if identity is not None else None
    except Exception:
        user_id = None
    
    # If no authenticated user, use or create demo user
    if not user_id:
        demo_user = User.query.filter_by(email='demo@cirqlex.com').first()
        if not demo_user:
            from .. import bcrypt
            demo_user = User(
                email='demo@cirqlex.com',
                name='Demo User',
                password_hash=bcrypt.generate_password_hash('demo123').decode('utf-8')
            )
            db.session.add(demo_user)
            db.session.flush()
        user_id = demo_user.id

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
    identity = get_jwt_identity()
    try:
        user_id = int(identity)
    except (TypeError, ValueError):
        return jsonify({'error': 'unauthorized'}), 403

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
    identity = get_jwt_identity()
    try:
        user_id = int(identity)
    except (TypeError, ValueError):
        return jsonify({'error': 'unauthorized'}), 403

    product = Product.query.get_or_404(product_id)

    # Check ownership
    if product.owner_id != user_id:
        return jsonify({'error': 'unauthorized'}), 403

    db.session.delete(product)
    db.session.commit()

    return jsonify({'message': 'product deleted'}), 200
