from flask import Blueprint, jsonify

from auth.auth_funcs import *


blueprint_auth = Blueprint(name="blueprint_auth", import_name=__name__)


@blueprint_auth.route('/register', methods=['GET', 'POST'])
def api_register_user():
    return jsonify(signup_user())

@blueprint_auth.route('/login', methods=['GET', 'POST'])
def api_user_login():
    return jsonify(login_user())
