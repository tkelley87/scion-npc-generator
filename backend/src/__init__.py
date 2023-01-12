import os
from flask import Flask
from flask_cors import CORS


def create_app():

    app = Flask(__name__)
    cors = CORS(app)

    with app.app_context():

        CONFIG_TYPE = os.getenv("CONFIG_TYPE", default="config.localDockerConfig")
        print('This is content type => ', CONFIG_TYPE)
        app.config.from_object(CONFIG_TYPE)

        # Register Blueprints
        register_blueprints(app)

        print("\n**** Welcome to Scion's Backend ****\n****       Enjoy your stay      ****\n")

        return app


### Helper Functions ###
def register_blueprints(app):
    from src.routes import routes_blueprint

    app.register_blueprint(routes_blueprint, url_prefix="/api")
