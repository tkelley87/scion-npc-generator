import logging
from src import create_app

app = create_app()

if __name__ == "__main__":
    app.run()

else:
    gunicorn_logger = logging.getLogger('gunicorn.error')
    app.logger.handlers = gunicorn_logger.handlers
    app.logger.setLevel(gunicorn_logger.level)
    # # Set up logging, Comment above out and un-comment below for local development.
    # handler = logging.StreamHandler()
    # handler.setLevel(logging.INFO)
    # app.logger.addHandler(handler)
    # app.logger.setLevel(logging.INFO)
