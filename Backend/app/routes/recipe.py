from flask import request, jsonify, Blueprint
from app.recipe_ai import get_recipe_from_mistral


recipe_bp = Blueprint('recipe', __name__)


@recipe_bp.route('/api/generate-recipe', methods=['POST'])
def generate_recipe():
    ingredients = request.json.get('ingredients', [])

    if not ingredients:
        return jsonify({'error': 'No ingredients provided'}), 400

    recipe = get_recipe_from_mistral(ingredients)

    if recipe:
        return jsonify({'recipe': recipe}), 200
    else:
        return jsonify({'error': 'Recipe generation failed'}), 500
