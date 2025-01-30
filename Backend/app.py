from flask import Flask, jsonify, request
from flask_cors import CORS
from models import Ingredient, User
from extensions import db


def create_app():
    app = Flask(__name__)

    # Unables cross origin requests
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Create database models and tables
    with app.app_context():
        db.create_all()

    # Routes
    @app.route('/api/login', methods=['POST'])
    def login():
        pass

    @app.route('/api/recipes')
    def get_recipes():
        return 'recipes'

    @app.route('/api/<int:user_id>/ingredients')
    def get_ingredients(user_id):
        user = User.query.filter_by(id=user_id).first()
        if not user:
            return jsonify({"error": "User not found"}), 404

        ingredients = [ingredient.name for ingredient in user.has_ingredients]
        return jsonify(ingredients)

    @app.route('/api/ingredients/<int:id>', methods=['POST'])
    def add_ingredients(id):
        pass

    @app.route('/api/ingredients/<int:id>', methods=['DELETE'])
    def delete_ingredients(id):
        pass

    return app


app = create_app()


@app.cli.command("add-test-data")
def add_test_data():
    """Add test data to the database."""
    with app.app_context():  # Push the app context

        # Add users and ingredients to the database
        # egg = Ingredient(name="Egg")
        # db.session.add_all([egg])

        # Retrieve users and ingredients from the database
        ala = User.query.filter_by(username='Ala').first()
        tomek = User.query.filter_by(username='Tomek').first()
        egg = Ingredient.query.filter_by(name='Egg').first()
        carrot = Ingredient.query.filter_by(name='Carrot').first()
        potato = Ingredient.query.filter_by(name='Potato').first()

        # # Assign relationships
        # ala.has_ingredients.append(potato)
        # ala.has_ingredients.append(egg)
        # tomek.has_ingredients.append(egg)

        # db.session.commit()
        print("Test data added successfully!")


if __name__ == '__main__':
    app.run(debug=True)
