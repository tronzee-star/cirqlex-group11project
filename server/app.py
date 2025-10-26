from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)

# Basic configuration - adjust as needed or move to a config file
app.config.setdefault("SECRET_KEY", os.environ.get("SECRET_KEY", "dev-secret"))
app.config.setdefault("SQLALCHEMY_DATABASE_URI", os.environ.get("SQLALCHEMY_DATABASE_URI", "sqlite:///data.db"))
app.config.setdefault("SQLALCHEMY_TRACK_MODIFICATIONS", False)
app.config.setdefault("JWT_SECRET_KEY", os.environ.get("JWT_SECRET_KEY", "jwt-secret"))

# Extensions
CORS(app, resources={r"/api/*": {"origins": [
    "http://localhost:3000", "http://127.0.0.1:3000",
    "http://localhost:5173", "http://127.0.0.1:5173"
]}}, supports_credentials=True)
db = SQLAlchemy(app)
jwt = JWTManager(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    first_name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)

    def set_password(self, password: str):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
        }


def create_tables():
    # Create DB tables within app context. We call this explicitly before running
    # the server to avoid relying on the app.before_first_request decorator.
    with app.app_context():
        db.create_all()


def validate_email(email: str) -> bool:
    import re
    return bool(re.match(r"[^@]+@[^@]+\.[^@]+", email))


@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request must be JSON"}), 400

    username = (data.get("username") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    first_name = (data.get("first_name") or "").strip()
    last_name = (data.get("last_name") or "").strip()

    if not username or not email or not password:
        return jsonify({"error": "username, email and password are required"}), 400

    if not validate_email(email):
        return jsonify({"error": "Invalid email format"}), 400

    if len(password) < 6:
        return jsonify({"error": "Password must be at least 6 characters"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 409
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(username=username, email=email, first_name=first_name, last_name=last_name)
    user.set_password(password)
    db.session.add(user)
    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Registration failed", "details": str(e)}), 500

    access = create_access_token(identity=user.id)
    refresh = create_refresh_token(identity=user.id)
    return jsonify({"message": "User registered", "user": user.to_dict(), "access_token": access, "refresh_token": refresh}), 201


@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"error": "Request must be JSON"}), 400

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"error": "email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    access = create_access_token(identity=user.id)
    refresh = create_refresh_token(identity=user.id)
    return jsonify({"message": "Login successful", "user": user.to_dict(), "access_token": access, "refresh_token": refresh}), 200


@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask backend!"})


if __name__ == '__main__':
    host = os.environ.get("HOST", "127.0.0.1")
    port = int(os.environ.get("PORT", "5001"))
    print(f"Starting Flask on http://{host}:{port}")
    # ensure tables exist
    create_tables()
    app.run(host=host, port=port, debug=True)
