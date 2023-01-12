# This blueprint will deal with all user management functionality

from flask import Blueprint

routes_blueprint = Blueprint('routes', __name__)

from . import routes
