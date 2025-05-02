from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, jwt
from routes.auth import auth_bp
from routes.ingredients import ingredients_bp
from routes.recipe import recipe_bp


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

    return app


app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
