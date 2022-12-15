import json
import random
import uuid

import controller as dynamodb
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__, static_folder="../build", static_url_path="/")
cors = CORS(app)

character_profile = {}
gender_list = ["male", "female"]
attitude_list = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
cult_types = [
    "Coven",
    "Guild",
    "Family Tradition",
    "Historian",
    "Mystery Society",
    "Reliquarian",
    "Social Club",
    "Temple",
    "No",
]


def file_list_into_var(filepath, file_type):
    file = open(filepath, "r")
    if file_type == "txt":
        file_data = file.read()
        return file_data.split("\n")
    elif file_type == "json":
        return json.load(file)


def random_with_list(given_list, weighting=None, selected_count=None):
    if weighting and selected_count:
        return random.choices(given_list, weights=weighting, k=selected_count)
    elif weighting:
        return random.choices(given_list, weights=weighting)[0]
    elif selected_count:
        return random.choices(given_list, k=selected_count)
    else:
        return random.choices(given_list)[0]


def add_qualities_and_flairs(npc_archetype):
    return npc_archetype


@app.route("/api/form", methods=["POST", "OPTIONS"])
def main():
    print("Got your request, processing....")
    print(request.json)
    given_pantheon = request.json["pantheon"]
    npc_type = request.json["type"]
    human = request.json["human"]
    is_name_generic = request.json["nameGeneric"]

    gender = random_with_list(gender_list)
    drives_data_into_list = file_list_into_var("npc_stats/drives.txt", "txt")
    traits_data_into_list = file_list_into_var("npc_stats/traits.txt", "txt")
    creature_list = file_list_into_var(
        "creatures_folder/{}_creatures.txt".format(given_pantheon), "txt"
    )
    npc_base_stats = file_list_into_var("npc_stats/base_stats.json", "json")
    qualities_list = file_list_into_var("npc_stats/qualities.json", "json")
    flairs_list = file_list_into_var("npc_stats/flairs.json", "json")
    if is_name_generic == "yes":
        name_list = file_list_into_var(
            "names_folder/generic_{}_names.txt".format(gender), "txt"
        )
    else:
        name_list = file_list_into_var(
            "names_folder/{}_{}_names.txt".format(given_pantheon, gender), "txt"
        )
    character_profile["Name"] = random_with_list(name_list)
    character_profile["Gender"] = gender
    character_profile["Traits"] = random_with_list(
        traits_data_into_list, selected_count=3
    )
    character_profile["Drive"] = random_with_list(drives_data_into_list)
    character_profile["Pantheon"] = given_pantheon
    character_profile["Attitude towards player"] = random_with_list(
        attitude_list, weighting=(2, 4, 10, 20, 30, 15, 30, 20, 10, 4, 2)
    )
    if human == "yes":
        character_profile["Apart of Cult?"] = random_with_list(
            cult_types, weighting=(2, 20, 3, 20, 10, 15, 40, 40, 150)
        )
    else:
        character_profile["Creature Type"] = random_with_list(creature_list)
    character_profile["Stats"] = npc_base_stats[npc_type]
    character_profile["Qualities"] = qualities_list["Combat"][
        random.randint(0, len(qualities_list["Combat"]) - 1)
    ]

    id = uuid.uuid4().hex
    response = dynamodb.write_to_npc_gen(id, character_profile)
    print(response)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {"msg": "Added npc successfully", "id": id}
    return {"msg": "Some error occurred", "response": response}


@app.route("/npc/<id>", methods=["GET"])
def get_npc(id):
    response = dynamodb.get_npc_gen_by_id(id)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        if "Item" in response:
            return {"npc": response["Item"]}
        return {"msg": "Item not found!"}
    return {"msg": "Some error occurred", "response": response}


# @app.route("/")
# def getTable():
#     try:
#         dynamodb.create_table_npc_gen()
#         return {"msg": "Table has been created for you."}
#     except:
#         return {"msg": "Table already exist."}

@app.before_first_request
def getTable():
    try:
        dynamodb.create_table_npc_gen()
        print({"msg": "Table has been created for you."})
        return {"msg": "Table has been created for you."}
    except:
        return {"msg": "Table already exist."}

# @manager.command
# def run_server():
#     getTable()
#     app.run()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
#     # manager.run()
#     # manager.run(FLASK_DEBUG=1, host="0.0.0.0", port=5000)
#     print(f'{app} is running.')
#     app.run()
