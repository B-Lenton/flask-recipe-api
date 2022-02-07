from flask import Flask, request, jsonify, abort, session
from flask_cors import CORS
from flask_bcrypt import bcrypt
from flask_httpauth import HTTPBasicAuth

from blueprints.blueprint_recipes import *
from blueprints.blueprint_auth import *


app = Flask(__name__)
auth = HTTPBasicAuth()

CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/recipes', methods=['GET'])
def api_get_recipes():
    return jsonify(get_recipes())

@app.route('/api/recipes/<int:recipe_id>', methods=['GET'])
def api_get_recipe(recipe_id):
    return jsonify(get_recipe_by_id(recipe_id))

@app.route('/api/recipes/add',  methods = ['POST'])
@auth.login_required
def api_add_recipe():
    recipe = request.get_json()
    return jsonify(create_recipe(recipe))

@app.route('/api/recipes/update/<int:recipe_id>',  methods = ['PUT'])
@auth.login_required
def api_update_recipe(recipe_id):
    recipe = request.get_json()
    return jsonify(update_recipe(recipe, recipe_id))

@app.route('/api/recipes/delete/<int:recipe_id>',  methods = ['DELETE'])
@auth.login_required
def api_delete_recipe(recipe_id):
    recipe = request.get_json()
    return jsonify(delete_recipe(recipe, recipe_id))

@app.route('/api/recipes/search', methods=['POST'])
def api_search_recipes():
    query_string = request.query_string.decode() 
    return jsonify(search_recipes(query_string))

# below two implemented using: https://blog.miguelgrinberg.com/post/restful-authentication-with-flask
@app.route('/api/users/signup', methods = ['POST'])
def new_user():
    try:
        name = request.json.get('name')
        # TODO: Recreate DB, making email unique in users table
        email = request.json.get('email')
        password = request.json.get('password')
        if name is None or password is None:
            abort(400) # missing arguments

        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(
            "SELECT email FROM users WHERE email = ?",
            (email,)
        )
        if cur.fetchone() is not None:
            print("user exists")
            abort(400) # existing user
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        cur.execute("""
        INSERT INTO users (name, email, password) 
        VALUES (?, ?, ?)
        """,
        (name, email, hashed_password,))

        conn.commit()
    except Exception as e:
        conn.rollback()
    finally:
        conn.close()
        
    return jsonify({ 'name': name }), 201


@auth.verify_password
def verify_password(name, email, password):
    # TODO: can be broken down into function get_user() - also in above func
    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute(
        "SELECT email FROM users WHERE email = ?",
        (email,)
    )
    user = cur.fetchone()
    if user is None and verify_password(password):
        return False
    session["user"] = user
    return True

if __name__ == "__main__":
    app.run(host="localhost", port=8000)
