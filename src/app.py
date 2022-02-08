import uuid
import jwt
import datetime

from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from functools import wraps
from werkzeug.security import generate_password_hash, check_password_hash

from blueprints.blueprint_recipes import *
# from blueprints.blueprint_auth import *


app = Flask(__name__)
app.config["SECRET_KEY"]='\xe37\xd7\x97\x82\x97\x14\xeb\xc1\x97i\xd11l\x85\x1e\x9d\xeb\x16\xfe\xb0\xe7\xc4\xfe'
CORS(app, resources={r"/*": {"origins": "*"}})


class Users():
    def __init__(self, user_id, name, email, password):
        self.user_id = user_id
        self.name = name
        self.email = email
        self.password = password


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


@app.route('/register', methods=['GET', 'POST'])
def signup_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
            (data['name'], data['email'], hashed_password,)
        )
        conn.commit()
    except sqlite3.IntegrityError:
        return jsonify({'message': 'Email already registered'})

    return jsonify({'message': 'registered successfully'})


@app.route('/login', methods=['GET', 'POST'])
def login_user():

    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response('could not verify', 401, 
        {'WWW.Authentication': 'Basic realm: "login required"'})

    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    # TODO: Is it correct to check this against a non-unique name? Would email (with UNIQUE) be better?
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
        
        return jsonify({'token' : token}) 

    return make_response('could not verify',  401, 
    {'WWW.Authentication': 'Basic realm: "login required"'})


@app.route('/api/recipes', methods=['GET'])
def api_get_recipes():
    return jsonify(get_recipes())

@app.route('/api/recipes/<int:recipe_id>', methods=['GET'])
def api_get_recipe(recipe_id):
    return jsonify(get_recipe_by_id(recipe_id))

@app.route('/api/recipes/add',  methods = ['POST'])
@token_required
def api_add_recipe(current_user):
    recipe = request.get_json()
    return jsonify(create_recipe(recipe, current_user))

@app.route('/api/recipes/update/<int:recipe_id>',  methods = ['PUT'])
@token_required
def api_update_recipe(current_user, recipe_id):
    recipe = request.get_json()
    return jsonify(update_recipe(recipe, recipe_id, current_user))

@app.route('/api/recipes/delete/<int:recipe_id>',  methods = ['DELETE'])
@token_required
def api_delete_recipe(current_user, recipe_id):
    # recipe = request.get_json() - also deleted recipe from below func params.
    return jsonify(delete_recipe(recipe_id, current_user))

@app.route('/api/recipes/search', methods=['POST'])
def api_search_recipes():
    query_string = request.query_string.decode() 
    return jsonify(search_recipes(query_string))


if __name__ == "__main__":
    app.run(host="localhost", port=8000)
