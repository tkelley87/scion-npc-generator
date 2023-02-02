import os
from dotenv import dotenv_values

# Variables
config = dotenv_values(".env")


class Config:
    """
    Base configuration class. Contains default configuration settings + configuration settings applicable to all environments.
    """

    DEBUG = False
    TESTING = False


class ProdConfig(Config):
    """
    Prod Config Class
    """
    # DynamoDB env vars
    AWS_ACCESS_KEY_ID = config["AWS_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY = config["AWS_SECRET_ACCESS_KEY"]
    REGION_NAME = config["REGION_NAME"]
    DYNAMODB_URI = config["DYNAMODB_URI"]
    FLASK_APP = config["FLASK_APP"]
    FLASK_ENV = "production"
    DEBUG = False


class DevConfig(Config):
    """
    Dev Config Class
    """
    # DynamoDB env vars
    AWS_ACCESS_KEY_ID = "dummy"
    AWS_SECRET_ACCESS_KEY = "dummy"
    REGION_NAME = "dummy"
    DYNAMODB_URI = "http://localhost:8000/"
    FLASK_ENV = "development"
    DEBUG = True


class localDockerConfig(Config):
    """
    Local Docker Config Class
    """
    # DynamoDB env vars
    AWS_ACCESS_KEY_ID = config["AWS_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY = config["AWS_SECRET_ACCESS_KEY"]
    REGION_NAME = config["REGION_NAME"]
    DYNAMODB_URI = config["DYNAMODB_URI"]

    FLASK_ENV = "development"
    DEBUG = True
