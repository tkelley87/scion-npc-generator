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
    character_profile["name"] = random_with_list(name_list)
    character_profile["gender"] = gender
    character_profile["traits"] = random_with_list(
        traits_data_into_list, selected_count=3
    )
    character_profile["drive"] = random_with_list(drives_data_into_list)
    character_profile["pantheon"] = given_pantheon
    character_profile["attitude_towards_player"] = random_with_list(
        attitude_list, weighting=(2, 4, 10, 20, 30, 15, 30, 20, 10, 4, 2)
    )
    if human == "yes":
        character_profile["apart_of_cult"] = random_with_list(
            cult_types, weighting=(2, 20, 3, 20, 10, 15, 40, 40, 150)
        )
    else:
        character_profile["creature_type"] = random_with_list(creature_list)
    character_profile["stats"] = npc_base_stats[npc_type]
    character_profile["qualities"] = qualities_list["Combat"][
        random.randint(0, len(qualities_list["Combat"]) - 1)
    ]

    id = uuid.uuid4().hex
    response = dynamodb.write_to_npc_gen(id, character_profile)
    print(response)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {"msg": "Added npc successfully", "id": id}
    return {"msg": "Some error occurred", "response": response}


@app.route("/api/npc/<id>", methods=["GET"])
def get_npc(id):
    response = dynamodb.get_npc_gen_by_id(id)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        if "Item" in response:
            # print(response["Item"][0])
            return response["Item"]["npc"]
        return {"msg": "Item not found!"}
    return {"msg": "Some error occurred", "response": response}

@app.before_first_request
def getTable():
    try:
        dynamodb.create_table_npc_gen()
        print({"msg": "Table has been created for you."})
        return {"msg": "Table has been created for you."}
    except:
        return {"msg": "Table already exist."}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
