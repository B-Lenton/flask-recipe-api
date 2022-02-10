import sqlite3

from db_connection import connect_to_db


def create_recipe(recipe, current_user):
    """
    Expected data (object) for creating recipes:
    {
        "recipe_name": str(user input),
        "description": str(user input),
        "creator": int(current user),
        "ingredients": [
            {
                "name": "ingredient_name",
                "unit": "measurement_units",
                "quantity": "measurement_qty"
            }, {...}
        ],
        "method": [
            {
                "step_no": int(auto generated),
                "step": str(user input)
            }, {...}
        ]
    }
    """
    created_recipe = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        # insert recipe into recipes table
        inserted_recipe = cur.execute(
            "INSERT INTO recipes (recipe_name, description, creator) VALUES (?, ?, ?)", 
            (recipe['recipe_name'], recipe['description'], current_user['user_id'],)
        )
        recipe_id = inserted_recipe.lastrowid
        # Loop through each ingredient dict, extracting name and quantity for use in insert statements:
        for ingredient in recipe["ingredients"]:
            cur.execute(
                "INSERT OR IGNORE INTO ingredients (ingredient_name) VALUES (?)", 
                (ingredient["name"],)
            )
            cur.execute(
                "INSERT OR IGNORE INTO measurement_qty (qty_amount) VALUES (?)", 
                (ingredient["quantity"],)
            )
            # conn.commit() ???
            cur.execute(
                "INSERT INTO recipe_ingredients VALUES ((?), (SELECT measurement_id FROM measurement_units WHERE measurement_type = ?), (SELECT qty_id FROM measurement_qty WHERE qty_amount = ?), (SELECT ingredient_id FROM ingredients WHERE ingredient_name = ?))", 
                (
                    recipe_id, 
                    ingredient["unit"], 
                    ingredient["quantity"], 
                    ingredient["name"],
                )
            )
        # loop through each step dict in the method and insert into method DB:
        for step in recipe["method"]:
            cur.execute(
                "INSERT INTO methods VALUES (?, ?, ?)",
                (recipe_id, step["step_no"], step["step"],)
            )
        conn.commit()
        
        created_recipe = get_recipe_by_id(recipe_id)
    except:
        conn.rollback()
    finally:
        conn.close()

    return created_recipe, 201


def get_recipes():
    """
    Returns limited data on all existing recipes.
    """
    recipes = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM recipes")
        rows = cur.fetchall()

        # convert row object to dictionary
        for i in rows:
            recipe = {}
            recipe["recipe_id"] = i["recipe_id"]
            recipe["recipe_name"] = i["recipe_name"]
            recipe["description"] = i["description"]
            print(recipe)
            cur.execute("SELECT name FROM users WHERE user_id = ?", 
                (i["creator"],))
            creator = cur.fetchone()
            recipe["creator"] = creator["name"]
            recipes.append(recipe)
        
    except:
        recipes = []

    return {"recipes": recipes}


def get_recipe_by_id(recipe_id):
    """
    Returns all information about an existing recipe by its ID.
    """
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(
            "SELECT * FROM recipes WHERE recipe_id = ?", 
            (recipe_id,)
        )
        recipe = cur.fetchone()

        if recipe is None:
            recipe = { "message": "recipe does not exist" }
        
        cur.execute(
            """
            SELECT 
            ingredients.ingredient_name AS name, 
            measurement_units.measurement_type AS unit,
            measurement_qty.qty_amount AS quantity
            FROM recipe_ingredients
            INNER JOIN 
            ingredients ON ingredients.ingredient_id = recipe_ingredients.ingredient_id 
            INNER JOIN
            measurement_units ON measurement_units.measurement_id = recipe_ingredients.measurement_id
            INNER JOIN
            measurement_qty ON measurement_qty.qty_id = recipe_ingredients.measurement_qty_id
            WHERE recipe_ingredients.recipe_id = ?
            """, 
            (recipe_id,)
        )

        ingredients = []
        for row in cur.fetchall():
            ingredients.append(dict(zip(["name", "unit", "quantity"], row)))

        cur.execute(
            "SELECT step_no, step FROM methods WHERE recipe_id = ? ORDER BY step_no ASC", 
            (recipe_id,)
        )

        method = []
        for row in cur.fetchall():
            method.append(dict(zip(["step_no", "step"], row)))

    except:
        recipe = {}
        ingredients = []
        method = []

    return { **recipe, "ingredients": ingredients, "method": method }


def update_recipe(recipe, recipe_id, current_user):
    """
    Currently updates title and description.
    TODO: Should be able to update ALL data about a recipe:
    https://stackoverflow.com/questions/6677517/update-if-different-changed
    """
    updated_recipe = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT creator FROM recipes WHERE recipe_id = ?",
            (recipe_id,)
        )
        if cur.fetchone()['creator'] == current_user['user_id']:
            cur.execute("""
                UPDATE recipes SET 
                recipe_name = ?, 
                description = ? 
                WHERE recipe_id = ? AND creator = ?
                """, 
                (recipe["recipe_name"], 
                recipe["description"], 
                recipe_id, 
                current_user['user_id'],)
            )
            conn.commit()
            updated_recipe = get_recipe_by_id(recipe_id)
        else:
            updated_recipe = {}
    except:
        conn.rollback()
        updated_recipe = {}
    finally:
        conn.close()
    return updated_recipe


def delete_recipe(recipe_id, current_user):
    """
    Delete recipe using recipe_id from url and creator id.
    """
    message = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("PRAGMA foreign_keys=ON")

        # check that the recipe exists
        cur.execute("SELECT * FROM recipes WHERE recipe_id = ? AND creator = ?", 
            (recipe_id, current_user['user_id'],))

        if cur.fetchone() is None:
            message["status"] = "Recipe not found"
        else:
            cur.execute("DELETE from recipes WHERE recipe_id = ? AND creator = ?", 
            (recipe_id, current_user['user_id'],))
            conn.commit()
            message["status"] = "Recipe deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete recipe"
    finally:
        conn.close()

        return message


def search_recipes(search_value):
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        recipes = []
        cur.execute("""
        SELECT * FROM recipes WHERE recipe_id IN (SELECT ROWID FROM recipes_fts WHERE recipe_name MATCH ? OR description MATCH ? ORDER BY rank)
        """,
        (search_value + "*", search_value + "*",)
        )

        for recipe in cur.fetchall():
            recipes.append(dict(zip(["recipe_id", "recipe_name", "description", "creator"], recipe)))
    except:
        recipes = {}
    finally:
        conn.close()

    return recipes


def display_measurement_units():
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        units = []
        cur.execute(
            "SELECT measurement_type FROM measurement_units"
        )
        for unit in cur.fetchall():
            units.append(dict(zip(["measurement_type"], unit)))
    except:
        units = {}
    finally:
        conn.close()

    return units