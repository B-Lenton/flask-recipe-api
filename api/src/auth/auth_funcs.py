import datetime
import json
import sqlite3

from flask import request, make_response, jsonify, current_app as app
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

from db_connection import connect_to_db


def signup_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    message = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            (data['name'], data['email'], hashed_password,)
        )
        conn.commit()
        message['status'] = 'Registered successfully'
    except sqlite3.IntegrityError:
        message['status'] = 'Email already registered'
        return message

    return message


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


def login_user():
    try:
        email = request.json.get("email", None)
        password = request.json.get("password", None)

        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(
            "SELECT * FROM users WHERE email = ?",
            (email,)
        )
        user = cur.fetchone()

        if email == user['email'] \
                and check_password_hash(user['password'], password):
            access_token = create_access_token(identity=email)
            response = {"access_token": access_token}
            # message = {"message": "Login successful"}
            # set_access_cookies(message, access_token)
            return response
        else:
            return {"message": "Wrong email or password"}, 401
    except:
        return {"message": "An error occurred"}


def logout_user():
    response = {"message": "logout successful"}
    return response

