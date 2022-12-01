from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/form": {"origins": "*"}})


@app.route("/form", methods=["POST", "OPTIONS"])
def form():
    print(request)
    pantheon = request.json["pantheon"]
    type = request.json["type"]
    human = request.json["human"]

    response_body = {"pantheon": pantheon, "type": type, "human": human}
    print(response_body)
    return response_body

@app.route("/")
def helloWorld():
   return "Hello, cross-origin-world"