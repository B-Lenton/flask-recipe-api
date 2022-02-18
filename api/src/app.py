from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from blueprints.blueprint_recipes import blueprint_recipes
from blueprints.blueprint_auth import blueprint_auth


app = Flask(__name__)
app.config.from_object('config')
CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)


app.register_blueprint(blueprint_recipes, url_prefix="/api/v1/recipes")
app.register_blueprint(blueprint_auth, url_prefix="/api/v1/auth")

if __name__ == "__main__":
    # FOR DEVELOPMENT
    app.run(host='0.0.0.0', debug=True)
