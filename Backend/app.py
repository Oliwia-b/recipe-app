from flask import Flask, jsonify, request
from flask_cors import CORS
from models import Ingredient, User
from extensions import db
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


app = Flask(__name__)

# Unable cross origin requests
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Create database models and tables
with app.app_context():
    db.create_all()

# JWT configuration
app.config['JWT_SECRET_KEY'] = 'secret-key'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 7 * 24 * 60 * 60   # 7 days
jwt = JWTManager(app)


# Routes
@app.route('/api/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if username is taken
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username is already taken'}), 400

    # Check password requirements
    if len(password) < 8 or ' ' in password:
        return jsonify({'error': 'Password should be at least 8 characters long and cannot contain spaces'}), 400

    # Create new user
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    """Authenticate user and return JWT."""
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if the user exists
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 401

    # Check the password
    if user.check_password(password):
        # Generate JWT
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)

    else:
        return jsonify({'error': 'Wrong password'}), 401


@app.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    pass


@app.route('/api/recipes')
def get_recipes():
    pass


@app.route('/api/ingredients')
@jwt_required()
def get_ingredients():
    user = User.query.filter_by(username=get_jwt_identity()).first()
    ingredients = [ingredient.name for ingredient in user.has_ingredients]
    return jsonify(ingredients)


@app.route('/api/ingredients', methods=['POST'])
@jwt_required()
def add_ingredients():
    user = User.query.filter_by(username=get_jwt_identity()).first()
    ingredient_name = request.json.get('name').strip()
    ingredient = Ingredient.query.filter_by(name=ingredient_name).first()

    # Check if user-ingredient relation already exists
    if ingredient in user.has_ingredients:
        return ({'error': 'Ingredient is already added'}), 400

    # Check if ingredient already exists in the database
    if not ingredient:
        # TODO: Function checking and preparing the ingredientformat before adding it to the databse
        # Add a new ingredient to the database
        ingredient = Ingredient(name=ingredient_name)
        db.session.add(ingredient)

    # Add user-ingredient relation
    user.has_ingredients.append(ingredient)
    db.session.commit()

    return jsonify({'message': 'Ingredient added successfully', 'ingredient': ingredient.name}), 201


@app.route('/api/ingredients/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_ingredients(id):
    pass


@app.cli.command('add-test-data')
def add_test_data():
    """Add test data to the database."""
    with app.app_context():  # Push the app context

        # # Add ingredients to the database
        # egg = Ingredient(name='Egg')
        # carrot = Ingredient(name='Carrot')
        # potato = Ingredient(name='Potato')

        # # Add users to the database
        # ala = User(username='Ala')
        # ala.set_password('1234pwd')
        # tomek = User(username='Tomek')
        # tomek.set_password('mypassword11')
        # db.session.add_all([egg, carrot, potato, ala, tomek   ])

        # Retrieve users and ingredients from the database
        ala = User.query.filter_by(username='Ala').first()
        tomek = User.query.filter_by(username='Tomek').first()
        egg = Ingredient.query.filter_by(name='Egg').first()
        carrot = Ingredient.query.filter_by(name='Carrot').first()
        potato = Ingredient.query.filter_by(name='Potato').first()

        # Assign relationships
        # ala.has_ingredients.append(potato)
        # ala.has_ingredients.append(egg)
        # tomek.has_ingredients.append(egg)

        # db.session.commit()
        print('Test data added successfully')


if __name__ == '__main__':
    app.run(debug=True)
