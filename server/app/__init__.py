from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import get_config
from dotenv import load_dotenv
load_dotenv()

# Extensions
db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(get_config())

    # CORS Configuration - use regex pattern to match Vercel deployments
    import re
    
    # Build allowed origins list with regex patterns
    allowed_origins = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://cirqlex-group11project.onrender.com",
        # Regex pattern to match all Vercel preview and production URLs
        r"https://cirqlex-group11project.*\.vercel\.app"
    ]
    
    # Add any configured origins from environment
    configured_origins = app.config.get("CORS_ORIGINS", [])
    if isinstance(configured_origins, str):
        configured_origins = [configured_origins]
    allowed_origins.extend([o.strip() for o in configured_origins if o.strip()])
    
    CORS(app, 
         origins=allowed_origins,
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
         allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept"],
         supports_credentials=True,
         expose_headers=["Content-Type", "Content-Length"],
         max_age=600)

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Register blueprints
    from .routes.auth_routes import auth_bp
    from .routes.product_routes import product_bp
    from .services.insight_routes import insight_bp
    from .routes.chat_routes import chat_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(product_bp, url_prefix="/api/products")
    app.register_blueprint(insight_bp, url_prefix="/api/insights")
    app.register_blueprint(chat_bp, url_prefix="/api/chat")

    # Populate development database with sample data if empty
    if app.config.get("DEBUG", False):
        from .models import ensure_sample_data

        with app.app_context():
            db.create_all()
            ensure_sample_data()

    # Simple health route
    @app.get("/api/health")
    def health():
        return {"status": "ok"}

    return app
