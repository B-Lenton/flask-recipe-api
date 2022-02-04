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
    created_recipe = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        # insert recipe into recipes table
        cur.execute("INSERT INTO recipes (recipe_name, description, creator) VALUES (?, ?, ?)", (recipe['recipe_name'], recipe['description'], recipe['creator'],))

        # Insert ingredients into ingredients table
        """
        # E.G:
        data = [
        ('Jane', date(2005, 2, 12)),
        ('Joe', date(2006, 5, 23)),
        ('John', date(2010, 10, 3)),
        ]
        stmt = "INSERT INTO employees (first_name, hire_date) VALUES (%s, %s)"
        cursor.executemany(stmt, data)
        """
        new_ingredient_names = []
        existing_ingredient_names = []
        insert_ingredients = "INSERT INTO ingredients (ingredient_name) VALUES (%s)"

        new_measurement_types = []
        existing_measurement_types = []
        insert_measurement_types = "INSERT INTO measurement_units (measurement_type) VALUES (%s)"

        new_qty_amounts = []
        existing_qty_amounts = []
        insert_qty_amounts = "INSERT INTO measurement_qty (qty_amount) VALUES (%s)"

        for index, ingredient in enumerate(recipe["ingredients"]):
            """
            Loop through each ingredient in the ingredients list.
            Categorise based on if they already exist in the database.
            """

            categorise_values(
                "SELECT * FROM ingredients WHERE ingredient_name = ?",
                ingredient, 
                new_ingredient_names, 
                existing_ingredient_names
            )

            # with standard for loop: index = recipe["ingredients"].index(f"'{ingredient}'")
            # get the corresponding measurement type for the current ingredient
            measurement_type = recipe["measurement_units"][index]
            categorise_values(
                "SELECT * FROM measurement_units WHERE measurement_type = ?",
                measurement_type, 
                new_measurement_types, 
                existing_measurement_types
            )

            # get the corresponding measurement quantity for the current ingredient
            measurement_qty = recipe["measurement_qty"][index]
            categorise_values(
                "SELECT * FROM measurement_qty WHERE measurement_qty = ?",
                measurement_qty, 
                new_qty_amounts, 
                existing_qty_amounts
            )


        if new_ingredient_names:
            print(new_ingredient_names)
            cur.executemany(insert_ingredients, new_ingredient_names)
            # TODO: Get database ID of these items to add to the recipe_ingredients join table
        
        # TODO: if existingList: get DB id of existing element to insert into recipe_ingredients join table with correct corresponding IDs 

        if new_measurement_types:
            print(new_measurement_types)
            cur.executemany(insert_measurement_types, new_measurement_types)
            # TODO: Get database ID of these items to add to the recipe_ingredients join table
        
        # TODO: if existingList: get DB id of existing element to insert into recipe_ingredients join table with correct corresponding IDs 

        if new_qty_amounts:
            print(new_qty_amounts)
            cur.executemany(insert_qty_amounts, new_qty_amounts)
            # TODO: Get database ID of these items to add to the recipe_ingredients join table
        
        # TODO: if existingList: get DB id of existing element to insert into recipe_ingredients join table with correct corresponding IDs 
        
        conn.commit()
        created_recipe = get_recipe_by_id(cur.lastrowid)
    except:
        conn.rollback()

    finally:
        conn.close()

    return created_recipe

# works:
# create_recipe({
#     "recipe_name": "Vegan Pizza",
#     "description": "You've never tasted anything like it",
#     "creator": 1
# })


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
        # check that the recipe exists
        count = conn.execute("SELECT COUNT (*) FROM recipes WHERE recipe_id = ? AND creator = ?", (recipe_id, recipe['creator'],))
        count = str(list(count)[0])[1:2]
        if count == "0":
            message["status"] = "Recipe not found"
        else:
            conn.execute("DELETE from recipes WHERE recipe_id = ? AND creator = ?", (recipe_id, recipe['creator'],))
            conn.commit()
            message["status"] = "Recipe deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete recipe"
    finally:
        conn.close()

    return message


def categorise_values(sql_stmt, query_data, new_list, existing_list):
    conn = connect_to_db()
    cur = conn.cursor()
    count = cur.execute(sql_stmt, (query_data,))
    count = str(list(count)[0])[1:2]
    if count == "0":
        new_list.push(f"('{query_data}'),")
    elif count == "1":
        existing_list.push(query_data)
    else:
        return "An unexpected error occurred."

    return new_list, existing_list

