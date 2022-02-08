import datetime
import jwt
import sqlite3

from flask import request, make_response, jsonify, current_app as app
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash

from db_connection import connect_to_db


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
        if not token:
            return jsonify({'message': 'a valid token is missing'})
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            conn = connect_to_db()
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            cur.execute(
                "SELECT * FROM users WHERE user_id = ?", 
                (data['user_id'],)
            )
            current_user = cur.fetchone()
        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    
    return decorator


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


def login_user():

    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('could not verify', 401, 
        {'WWW.Authentication': 'Basic realm: "login required"'})

    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM users WHERE email = ?", 
        (auth.username,)
    )
    user = cur.fetchone()

    if check_password_hash(user['password'], auth.password):
        token = jwt.encode({
            'user_id': user['user_id'], 
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])
        
        return {'token' : token} 

    return ('could not verify',  
            401, 
            {'WWW.Authentication': 'Basic realm: "login required"'})
