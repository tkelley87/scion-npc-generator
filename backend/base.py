from flask import Flask, request
from flask_cors import CORS

import random, json

app = Flask(__name__)
cors = CORS(app, resources={r"/form": {"origins": "*"}})

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
mook_base_stats = {
    "Primary Pool": 5,
    "Secondary Pool": 4,
    "Desperation Pool": 2,
    "Health": 1,
    "Defense": 1,
    "Initiative": 3,
}
professional_base_stats = {
    "Primary Pool": 7,
    "Secondary Pool": 5,
    "Desperation Pool": 3,
    "Health": 2,
    "Defense": 2,
    "Initiative": 5,
}
villain_base_stats = {
    "Primary Pool": 9,
    "Secondary Pool": 7,
    "Desperation Pool": 5,
    "Health": 4,
    "Defense": 3,
    "Initiative": 7,
}
monster_base_stats = {
    "Primary Pool": 11,
    "Secondary Pool": 9,
    "Desperation Pool": 5,
    "Health": 6,
    "Defense": 4,
    "Initiative": 9,
}


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


@app.route("/form", methods=["POST", "OPTIONS"])
def main():
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
    print(character_profile)
    return character_profile
