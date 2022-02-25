from flask import Blueprint, jsonify
from flask_jwt_extended import unset_jwt_cookies, jwt_required, get_jwt_identity

from auth.auth_funcs import *


blueprint_auth = Blueprint(name="blueprint_auth", import_name=__name__)


@blueprint_auth.route('/register', methods=['GET', 'POST'])
def api_register_user():
    return jsonify(signup_user())


@blueprint_auth.route('/login', methods=['POST'])
def api_user_login():
    return jsonify(login_user())


@blueprint_auth.route('/logout', methods=['POST'])
def api_user_logout():
    response = jsonify(logout_user())
    unset_jwt_cookies(response)
    return response


@blueprint_auth.route('/refresh', methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity, fresh=False)
    return jsonify(access_token=access_token)
