"""Web Server Gateway Interface"""

# for production:
from src.app import app

if __name__ == "__main__":
    # FOR DEVELOPMENT
    app.run(host='0.0.0.0', debug=True)


# To run:
# https://flask.palletsprojects.com/en/1.1.x/cli/
