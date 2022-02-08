from src.db_connection import connect_to_db


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
                password TEXT NOT NULL,
                UNIQUE(email)
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


def create_recipes_fts():
    """
    Create a virtual external content table for recipes table.
    Indexes the recipes table and implements full-text search
    """
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE VIRTUAL TABLE recipes_fts 
            USING fts5(
                recipe_name, 
                description, 
                creator UNINDEXED, 
                content=recipes, 
                tokenize = "porter unicode61 tokenchars '-'"
            );
        ''')
        conn.commit()
        print("Recipes FTS table created successfully")
    except Exception as e:
        print("Recipes FTS table creation failed:", e)
    finally:
        conn.close()


def create_fts_triggers():
    """
    Create triggers for the external content table.
    Ensures the FTS table is kept up-to-date with the recipes table.
    """
    try:
        conn = connect_to_db()
        conn.executescript('''
        CREATE TRIGGER recipes_ai 
        AFTER INSERT ON recipes BEGIN
        INSERT INTO recipes_fts(rowid, recipe_name, description, creator) 
        VALUES (new.recipe_id, new.recipe_name, new.description, new.creator);
        END;
        CREATE TRIGGER recipes_ad 
        AFTER DELETE ON recipes BEGIN
        INSERT INTO recipes_fts(recipes_fts, rowid, recipe_name, description, creator) 
        VALUES('delete', old.recipe_id, old.recipe_name, old.description, old.creator);
        END;
        CREATE TRIGGER recipes_au 
        AFTER UPDATE ON recipes BEGIN
        INSERT INTO recipes_fts(recipes_fts, rowid, recipe_name, description, creator) 
        VALUES('delete', old.recipe_id, old.recipe_name, old.description, old.creator);
        INSERT INTO recipes_fts(rowid, recipe_name, description, creator) 
        VALUES (new.recipe_id, new.recipe_name, new.description, new.creator);
        END;
        ''')
        conn.commit()
        print("Recipes FTS triggers created successfully")
    except Exception as e:
        print("Recipes FTS triggers creation failed:", e)
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


def create_methods_table():
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE methods (
                recipe_id INTEGER NOT NULL,
                step_no INTEGER NOT NULL,
                step TEXT NOT NULL,
                FOREIGN KEY(recipe_id)
                    REFERENCES recipes(recipe_id)
                    ON DELETE CASCADE
            );
        ''')
        conn.commit()
        print("Methods table created successfully")
    except:
        print("Methods table creation failed - Maybe table")
    finally:
        conn.close()


def populate_measurement_units_table():
    """
    Populate table with data.
    """
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO measurement_units (measurement_type) VALUES
            ("teaspoon (tsp)"),
            ("tablespoon (tbsp)"),
            ("fluid ounce (fl oz)"),
            ("gill"),
            ("cup"),
            ("pint"),
            ("quart"),
            ("gallon"),
            ("millilitre (ml)"),
            ("litre (l)"),
            ("decilitre (dl)"),
            ("pound (lb)"),
            ("ounce (oz)"),
            ("milligram (mg)"),
            ("gram (g)"),
            ("kilogram (kg)"),
            ("centimetre (cm)"),
            ("millimetre (mm)"),
            ("metre (m)"),
            ('inch (")'),
            ("pinch"),
            ("slice"),
            ("punnet"),
            ("tin"),
            ("jar"),
            ("bottle"),
            ("can"),
            ("bunch"),
            ("box")
            ;
        """)
        conn.commit()
        print("measurement units inserted successfully")
    except:
        print("measurement units insertion failed - Maybe table")
    finally:
        conn.close()


def index_tables():
    """
    Index the data for faster searching.
    """
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.executescript("""
            CREATE INDEX creator_idx
            ON recipes(creator);
            CREATE INDEX measurements_idx
            ON measurement_units(measurement_id, measurement_type);
            CREATE INDEX qty_idx
            ON measurement_qty(qty_id, qty_amount);
            CREATE INDEX ingredient_idx
            ON ingredients(ingredient_id, ingredient_name);
            CREATE INDEX recipe_ings_idx
            ON recipe_ingredients(recipe_id, measurement_id, measurement_qty_id, ingredient_id);
            CREATE INDEX methods_idx
            ON methods(recipe_id, step_no, step);
        """)
        conn.commit()
        print("Index successful")
    except:
        print("Index failed - Maybe table")
    finally:
        conn.close()


# create_users_table()
# create_recipes_table()
# create_ingredients_table()
# create_measurement_units_table()
# create_measurement_qty_table()
# create_recipe_ingredients_table()
# create_methods_table()
# populate_measurement_units_table()
# index_tables()
# create_recipes_fts()
# create_fts_triggers()
