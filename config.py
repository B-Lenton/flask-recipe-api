"""Flask configuration."""
from os import environ, path


basedir = path.abspath(path.dirname(__file__))


class Config:
    """Set Flask config variables."""

    SECRET_KEY = environ.get("SECRET_KEY")
    DEBUG = True
    TESTING = True
