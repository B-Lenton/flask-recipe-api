import json

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity
from datetime import datetime, timedelta, timezone

from blueprints.blueprint_recipes import blueprint_recipes
from blueprints.blueprint_auth import blueprint_auth


app = Flask(__name__)
app.config.from_object('config')
CORS(app, resources={r"/*": {"origins": "*"}})
jwt = JWTManager(app)


@app.after_request
def refresh_expiring_jwt(response):
    """
    Using an `after_request` callback:
    Refresh any token that is within 30 minutes of expiring.
    Takes the response of the protected endpoint as an argument.
    """
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
                # or try to use below instead of above line...
                # set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        """
        Case where there is not a valid JWT. 
        Just return the original response.
        """
        return response


app.register_blueprint(blueprint_recipes, url_prefix="/api/v1/recipes")
app.register_blueprint(blueprint_auth, url_prefix="/api/v1/auth")


if __name__ == "__main__":
    # FOR DEVELOPMENT
    app.run(host='0.0.0.0', debug=True)
