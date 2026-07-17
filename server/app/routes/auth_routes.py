from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .. import db, bcrypt
from ..models import User
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = (data.get('password') or '').strip()
    name = (data.get('name') or '').strip() or None

    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Account already exists. Please sign in instead.'}), 400

    try:
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(email=email, password_hash=pw_hash, name=name)
        db.session.add(user)
        db.session.commit()

        token = create_access_token(identity=str(user.id))
        return jsonify({
            'message': 'Account created successfully.',
            'user': user.to_dict(),
            'access_token': token
        }), 201
    except IntegrityError as e:
        db.session.rollback()
        return jsonify({'error': 'Account already exists. Please sign in instead.'}), 400
    except Exception as e:
        db.session.rollback()
        print(f"Signup error: {str(e)}")
        return jsonify({'error': 'Server error. Please try again later.'}), 500


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = (data.get('email') or '').strip().lower()
    password = (data.get('password') or '').strip()

    if not email or not password:
        return jsonify({'error': 'Email and password are required.'}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'Account not found. Please try again.'}), 404

    if not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({'error': 'Incorrect password. Please try again.'}), 401

    token = create_access_token(identity=str(user.id))
    return jsonify({
        'message': 'Login successful.',
        'user': user.to_dict(),
        'access_token': token
    })


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))
    if not user:
        return jsonify({'error': 'user not found'}), 404
    return jsonify({'user': user.to_dict()})
