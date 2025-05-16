from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


# Many to many relationship - junction table, stores foreign keys
user_ingredient = db.Table(
    "user_ingredient",
    # Composite primary key (combination user_id, ingredient_id must be unique)
    db.Column('user_id', db.Integer, db.ForeignKey(
        'user.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey(
        'ingredient.id'), primary_key=True)
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    # Connect User and Ingredient through user_ingredient table
    # (Ingredients that the user has)
    has_ingredients = db.relationship(
        'Ingredient', secondary=user_ingredient, backref='owners')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
