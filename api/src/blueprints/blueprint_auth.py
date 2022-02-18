from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from auth.auth_funcs import *

# add below lines to config file (import timedelta):
# If true this will only allow the cookies that contain your JWTs to be sent
# over https. In production, this should always be set to True
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

blueprint_auth = Blueprint(name="blueprint_auth", import_name=__name__)


@blueprint_auth.route('/register', methods=['GET', 'POST'])
def api_register_user():
    return jsonify(signup_user())


@blueprint_auth.route('/login', methods=['POST'])
def api_user_login():
    return jsonify(login_user())


@blueprint_auth.route('/logout', methods=['POST'])
@jwt_required()
def api_user_logout():
    response = jsonify(logout_user())
    unset_jwt_cookies(response)
    return response
