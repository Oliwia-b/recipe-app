from flask import Blueprint


util_bp = Blueprint('util', __name__)


@util_bp.route("/ping")
def health_check():
    return {"status": "ok"}, 200
