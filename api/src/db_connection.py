import sqlite3


def connect_to_db():
    """
    Reusable connection to the database.
    """
    conn = sqlite3.connect(
        '/home/ben/Desktop/Just-IT/python/recipe-app/api/database/recipe-app.db'
    )
    return conn
