from extensions import db


# Many to many relationship - junction table
user_ingredient = db.Table(
    "user_ingredient",
    db.Column('user_id', db.Integer, db.ForeignKey(
        'user.id'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey(
        'ingredient.id'), primary_key=True)
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    # Ingredients that the user has
    has_ingredients = db.relationship(
        'Ingredient', secondary=user_ingredient, backref='owners')


class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)


class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # Either db or ai for fetching recipes
