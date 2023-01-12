import os
from flask import Flask
from flask_cors import CORS

from dotenv import dotenv_values
config = dotenv_values(".env")

def create_app():

    app = Flask(__name__)
    cors = CORS(app)

    with app.app_context():

        config_type = config["CONFIG_TYPE"]
        app.config.from_object(config_type)

        # Register Blueprints
        register_blueprints(app)

        app.logger.info(
            f"""
            \n
            **** Welcome to Scion's Backend ****
            ****       Enjoy your stay      ****\n
            CONTENT_TYPE = {config_type}
            """
        )

        return app


### Helper Functions ###
def register_blueprints(app):
    from src.routes import routes_blueprint

    app.register_blueprint(routes_blueprint, url_prefix="/api")
