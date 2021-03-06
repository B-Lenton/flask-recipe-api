import sqlite3

from flask import request
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token

from db_connection import connect_to_db


def signup_user():
    # TODO: Handle email confirmation upon signup.
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
    except sqlite3.IntegrityError:
        message['status'] = 'Email already registered'
        return message

    return login_user()
    

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
            access_token = create_access_token(identity=email, fresh=True)
            refresh_token = create_refresh_token(identity=email)
            response = {
                "access_token": access_token, 
                "refresh_token": refresh_token
            }
            # message = {"message": "Login successful"}
            # set_access_cookies(message, access_token)
            return response
        else:
            return {"message": "Wrong email or password"}, 401
    except:
        return {"message": "An error occurred"}


def logout_user():
    response = {"result": True}
    return response

