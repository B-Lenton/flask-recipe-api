from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from recipes.recipe_funcs import *


blueprint_recipes = Blueprint(name="blueprint_recipes", import_name=__name__)


@blueprint_recipes.route('/', methods=['GET'])
def api_get_recipes():
    return jsonify(get_recipes())


@blueprint_recipes.route('/<int:recipe_id>', methods=['GET'])
def api_get_recipe(recipe_id):
    return jsonify(get_recipe_by_id(recipe_id))


@blueprint_recipes.route('/add',  methods=['POST'])
@jwt_required()
def api_add_recipe():
    recipe = request.get_json()
    return jsonify(create_recipe(recipe))


@blueprint_recipes.route('/update/<int:recipe_id>',  methods=['PUT'])
@jwt_required()
def api_update_recipe(recipe_id):
    recipe = request.get_json()
    return jsonify(update_recipe(recipe, recipe_id))


@blueprint_recipes.route('/delete/<int:recipe_id>',  methods=['DELETE'])
@jwt_required()
def api_delete_recipe(recipe_id):
    return jsonify(delete_recipe(recipe_id))


@blueprint_recipes.route('/search', methods=['POST'])
def api_search_recipes():
    query_string = request.query_string.decode() 
    return jsonify(search_recipes(query_string))


@blueprint_recipes.route('/units', methods=['GET'])
def api_get_units():
    return jsonify(display_measurement_units())


@blueprint_recipes.route('/user/<int:user_id>', methods=['GET'])
def api_view_profile(user_id):
    return jsonify(get_user_profile_by_id(user_id))
