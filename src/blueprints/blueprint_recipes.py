from flask import Blueprint, request, jsonify

from recipes.recipe_funcs import *
from auth.auth_funcs import token_required


blueprint_recipes = Blueprint(name="blueprint_recipes", import_name=__name__)


@blueprint_recipes.route('/', methods=['GET'])
def api_get_recipes():
    return jsonify(get_recipes())

@blueprint_recipes.route('/<int:recipe_id>', methods=['GET'])
def api_get_recipe(recipe_id):
    return jsonify(get_recipe_by_id(recipe_id))

@blueprint_recipes.route('/add',  methods = ['POST'])
@token_required
def api_add_recipe(current_user):
    recipe = request.get_json()
    return jsonify(create_recipe(recipe, current_user))

@blueprint_recipes.route('/update/<int:recipe_id>',  methods = ['PUT'])
@token_required
def api_update_recipe(current_user, recipe_id):
    recipe = request.get_json()
    return jsonify(update_recipe(recipe, recipe_id, current_user))

@blueprint_recipes.route('/delete/<int:recipe_id>',  methods = ['DELETE'])
@token_required
def api_delete_recipe(current_user, recipe_id):
    return jsonify(delete_recipe(recipe_id, current_user))

@blueprint_recipes.route('/search', methods=['POST'])
def api_search_recipes():
    query_string = request.query_string.decode() 
    return jsonify(search_recipes(query_string))