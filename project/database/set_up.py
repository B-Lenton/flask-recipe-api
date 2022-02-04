import sqlite3


def connect_to_db():
    """
    Reusable connection to the database.
    """
    conn = sqlite3.connect(
        '/home/ben/Desktop/Just-IT/python/recipe-app/project/database/recipe-app.db'
    )
    return conn

def create_users_table():
    """
    Create users table.
    """
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE users (
                user_id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                password TEXT NOT NULL
            );
        ''')
        conn.commit()
        print("Users table created successfully")
    except:
        print("Users table creation failed - Maybe table")
    finally:
        conn.close()


def create_recipes_table():
    """
    Create recipes table with a creator FK (= user_id).
    If a user is deleted, so are their recipes.
    """
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE recipes (
                recipe_id INTEGER PRIMARY KEY NOT NULL,
                recipe_name TEXT NOT NULL,
                description TEXT NOT NULL,
                creator INTEGER NOT NULL,
                CONSTRAINT fk_users
                    FOREIGN KEY (creator)
                    REFERENCES users(user_id)
                    ON DELETE CASCADE
            );
        ''')
        conn.commit()
        print("Recipes table created successfully")
    except:
        print("Recipes table creation failed - Maybe table")
    finally:
        conn.close()


def create_ingredients_table():
    """
    Create ingredients table.
    """
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE ingredients (
                ingredient_id INTEGER PRIMARY KEY NOT NULL,
                ingredient_name TEXT NOT NULL,
                UNIQUE(ingredient_name)
            );
        ''')
        conn.commit()
        print("Ingredients table created successfully")
    except:
        print("Ingredients table creation failed - Maybe table")
    finally:
        conn.close()


def create_measurement_units_table():
    """
    Create measurement units table.
    """
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE measurement_units (
                measurement_id INTEGER PRIMARY KEY NOT NULL,
                measurement_type TEXT NOT NULL,
                UNIQUE(measurement_type)
            );
        ''')
        conn.commit()
        print("Measurement units table created successfully")
    except:
        print("Measurement units table creation failed - Maybe table")
    finally:
        conn.close()


def create_measurement_qty_table():
    """
    Create measurement_qty table.
    """
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE measurement_qty (
                qty_id INTEGER PRIMARY KEY NOT NULL,
                qty_amount TEXT NOT NULL,
                UNIQUE(qty_amount)
            );
        ''')
        conn.commit()
        print("measurement_qty table created successfully")
    except:
        print("measurement_qty table creation failed - Maybe table")
    finally:
        conn.close()


def create_recipe_ingredients_table():
    """
    Create recipe_ingredients table.
    """
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE recipe_ingredients (
                recipe_id INTEGER NOT NULL,
                measurement_id INTEGER NOT NULL,
                measurement_qty_id INTEGER NOT NULL,
                ingredient_id INTEGER NOT NULL,
                FOREIGN KEY(recipe_id)
                    REFERENCES recipes(recipe_id)
                    ON DELETE CASCADE,
                FOREIGN KEY(measurement_id)
                    REFERENCES measurement_units(measurement_id)
                    ON DELETE CASCADE,
                FOREIGN KEY(measurement_qty_id)
                    REFERENCES measurement_qty(qty_id)
                    ON DELETE CASCADE,
                FOREIGN KEY(ingredient_id)
                    REFERENCES ingredients(ingredient_id)
                    ON DELETE CASCADE
            );
        ''')
        conn.commit()
        print("recipe_ingredients table created successfully")
    except:
        print("recipe_ingredients table creation failed - Maybe table")
    finally:
        conn.close()


# create_users_table()
# create_recipes_table()
# create_ingredients_table()
# create_measurement_units_table()
# create_measurement_qty_table()
# create_recipe_ingredients_table()


def create_recipe(recipe):
    """
    Expected data (object) for creating recipes:
    {
        "recipe_name": str(user input),
        "description": str(user input),
        "creator": int(current user),
        "ingredients": [ str(user input) ],
        "measurement_units": [ str(user input) ],
        "measurement_qty": [ str(user input) ]
    }
    """
    created_recipe = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        # insert recipe into recipes table
        cur.execute("INSERT INTO recipes (recipe_name, description, creator) VALUES (?, ?, ?)", (recipe['recipe_name'], recipe['description'], recipe['creator'],))

        # Commit changes so far to get most recent inserted row's id
        conn.commit()
        recipe_id = cur.lastrowid

        new_ingredient_names = []
        new_measurement_types = []
        new_qty_amounts = []

        for index, ingredient in enumerate(recipe["ingredients"]):
            """
            Loop through each ingredient in the ingredients list.
            Categorise based on if they already exist in the database.
            """

            categorise_values(
                "SELECT * FROM ingredients WHERE ingredient_name = ?",
                ingredient, 
                new_ingredient_names 
            )

            # get the corresponding measurement type for the current ingredient
            measurement_type = recipe["measurement_units"][index]
            categorise_values(
                "SELECT * FROM measurement_units WHERE measurement_type = ?",
                measurement_type, 
                new_measurement_types
            )

            # get the corresponding measurement quantity for the current ingredient
            measurement_qty = recipe["measurement_qty"][index]
            categorise_values(
                "SELECT * FROM measurement_qty WHERE qty_amount = ?",
                measurement_qty, 
                new_qty_amounts 
            )

        if new_ingredient_names:
            print("new ingredients", new_ingredient_names)
            for ingredient in new_ingredient_names:
                cur.execute("INSERT INTO ingredients (ingredient_name) VALUES (?)", (ingredient,))

        if new_measurement_types:
            print("new measurement types", new_measurement_types)
            for measurement_type in new_measurement_types:
                cur.execute("INSERT INTO measurement_units (measurement_type) VALUES (?)", (measurement_type,))

        if new_qty_amounts:
            print("new quantities", new_qty_amounts)
            for qty in new_qty_amounts:
                cur.execute("INSERT INTO measurement_qty (qty_amount) VALUES (?)", (qty,))

        """
        Loop through each ingredient (with index) to insert corresponding ingredients, measurement types, quantities, into the join table along with the correct recipe id:
        """
        for index, ingredient in enumerate(recipe["ingredients"]):
            cur.execute(
                "INSERT INTO recipe_ingredients VALUES ((?), (SELECT measurement_id FROM measurement_units WHERE measurement_type = ?), (SELECT qty_id FROM measurement_qty WHERE qty_amount = ?), (SELECT ingredient_id FROM ingredients WHERE ingredient_name = ?))", 
                (recipe_id, recipe["measurement_units"][index], recipe["measurement_qty"][index], ingredient,)
            )
        conn.commit()

        # TODO: Refactor the get_recipe_by_id function to return EVERYTHING from the different tables (use the join table as a basis) 
        created_recipe = get_recipe_by_id(recipe_id)
        print("Created recipe:", created_recipe)
    except:
        conn.rollback()

    finally:
        conn.close()

    return created_recipe


def get_recipes():
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
            recipe["creator"] = i["creator"]
            recipes.append(recipe)
    except:
        recipes = []

    return recipes


def get_recipe_by_id(recipe_id):
    # TODO: Refactor!! (See other TODO - just need to add key:val pairs to the dictionary)
    recipe = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM recipes WHERE recipe_id = ?", (recipe_id,))
        row = cur.fetchone()

        # convert row object to dictionary
        recipe["recipe_id"] = row["recipe_id"]
        recipe["recipe_name"] = row["recipe_name"]
        recipe["description"] = row["description"]
        recipe["creator"] = row["creator"]
    except:
        recipe = {}

    return recipe


def update_recipe(recipe):
    updated_recipe = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE recipes SET recipe_name = ?, description = ? WHERE recipe_id = ? AND creator = ?", (recipe["recipe_name"], recipe["description"], recipe["recipe_id"], recipe["creator"],))
        conn.commit()
        #return the recipe
        updated_recipe = get_recipe_by_id(recipe["recipe_id"])
    except:
        conn.rollback()
        updated_recipe = {}
    finally:
        conn.close()

    return updated_recipe


def delete_recipe(recipe, recipe_id):
    message = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        # check that the recipe exists
        cur.execute("SELECT * FROM recipes WHERE recipe_id = ? AND creator = ?", (recipe_id, recipe['creator'],))
        print(cur.lastrowid)

        if cur.fetchone is None:
            message["status"] = "Recipe not found"
        else:
            cur.execute("DELETE from recipes WHERE recipe_id = ? AND creator = ?", (recipe_id, recipe['creator'],))
            conn.commit()
            message["status"] = "Recipe deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete recipe"
    finally:
        conn.close()

        return message


def categorise_values(sql_stmt, query_data, new_list):
    # TODO: Wrap in try / except block
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute(sql_stmt, (query_data,))
    exists = cur.fetchone()
    
    if not exists:
        new_list.append(query_data)
        print(new_list)

    return new_list
