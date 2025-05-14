from flask import request, jsonify, Blueprint
from flask_jwt_extended import create_access_token, jwt_required
from extensions import db
from models import User


auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if username is taken
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Account with this email already exists'}), 400

    # Check password requirements
    if len(password) < 8 or ' ' in password:
        return jsonify({'error': 'Password should be at least 8 characters long and cannot contain spaces'}), 400

    # Create new user
    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@auth_bp.route('/api/login', methods=['POST'])
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
        user_id = str(user.id)
        access_token = create_access_token(identity=user_id)
        return jsonify(access_token=access_token)

    else:
        return jsonify({'error': 'Wrong password'}), 401


@auth_bp.route('/api/logout', methods=['POST'])
@jwt_required()
def logout():
    pass
