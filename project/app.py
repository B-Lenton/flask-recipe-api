from flask import Flask, request, jsonify
from flask_cors import CORS

from database.set_up import *

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/recipes', methods=['GET'])
def api_get_recipes():
    return jsonify(get_recipes())

@app.route('/api/recipes/<recipe_id>', methods=['GET'])
def api_get_recipe(recipe_id):
    return jsonify(get_recipe_by_id(recipe_id))

@app.route('/api/recipes/add',  methods = ['POST'])
def api_add_recipe():
    recipe = request.get_json()
    return jsonify(create_recipe(recipe))

@app.route('/api/recipes/update',  methods = ['PUT'])
def api_update_recipe():
    recipe = request.get_json()
    return jsonify(update_recipe(recipe))

@app.route('/api/recipes/delete/<recipe_id>',  methods = ['DELETE'])
def api_delete_recipe(recipe_id):
    recipe = request.get_json()
    print(recipe)
    return jsonify(delete_recipe(recipe, recipe_id))

if __name__ == "__main__":
    #app.debug = True
    #app.run(debug=True)
    app.run()
