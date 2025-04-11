from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import Ingredient, User
from extensions import db


ingredients_bp = Blueprint('ingredients', __name__)


@ingredients_bp.route('/api/ingredients')
@jwt_required()
def get_ingredients():
    user = User.query.filter_by(username=get_jwt_identity()).first()
    # if not user:
    #     return jsonify({'error': 'User not found'}), 404

    ingredients = [ingredient.name for ingredient in user.has_ingredients]
    return jsonify(ingredients)


@ingredients_bp.route('/api/ingredients', methods=['POST'])
@jwt_required()
def add_ingredients():
    user = User.query.filter_by(username=get_jwt_identity()).first()
    ingredient_name = request.json.get('name').strip().lower().title()
    ingredient = Ingredient.query.filter_by(name=ingredient_name).first()

    # Check if user-ingredient relation already exists
    if ingredient in user.has_ingredients:
        return ({'error': 'Ingredient already added'}), 400

    # Check if ingredient already exists in the database
    if not ingredient:
        # Add a new ingredient to the database
        ingredient = Ingredient(name=ingredient_name)
        db.session.add(ingredient)

    # Add user-ingredient relation
    user.has_ingredients.append(ingredient)
    db.session.commit()

    return jsonify({'message': 'Ingredient added successfully', 'ingredient': ingredient.name}), 201


@ingredients_bp.route('/api/ingredients/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_ingredients(id):
    pass
