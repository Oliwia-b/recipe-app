from app.__init__ import app


@app.route("/ping")
def health_check():
    return {"status": "ok"}, 200
