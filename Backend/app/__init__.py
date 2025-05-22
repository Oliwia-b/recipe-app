from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.extensions import db, jwt
from app.routes.auth import auth_bp
from app.routes.ingredients import ingredients_bp
from app.routes.recipe import recipe_bp
from app.routes.health_check import util_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Unable cross origin requests
    CORS(app)

    db.init_app(app)
    jwt.init_app(app)

    # Create database models and tables
    with app.app_context():
        db.create_all()

    app.register_blueprint(auth_bp)
    app.register_blueprint(ingredients_bp)
    app.register_blueprint(recipe_bp)
    app.register_blueprint(util_bp)

    return app


app = create_app()
