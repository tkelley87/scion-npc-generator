from flask import request, current_app
from . import routes_blueprint

import json
import os
import random
import uuid

import src.routes.controllers.controllers as dynamodb
import src.utilities.utilities as utilities

# Current directory is different machine to machine,
# this gives us a way to set it dynamically
set_static_files_location = os.getcwd() + "/src/routes/"


@routes_blueprint.route("/form", methods=["POST", "OPTIONS"])
def post_npc():
    """
    Route to post NPC based off of inputs from FE
    """

    # Function Scoped variables
    attitude_list = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
    gender_list = ["male", "female"]
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

    # Character Object to save to DynamoDB
    character_profile = {}
    print("Got your request, processing....")
    print(request.json)
    print(request)

    # Inputs from FE
    character_profile["Human"] = request.json["human"]
    given_pantheon = request.json["pantheon"]
    npc_type = request.json["npcType"]
    human = request.json["human"]
    is_name_generic = request.json["nameGeneric"]
    npc_favored_arena = request.json["npcFavoredArena"]
    shortened_npc_favored_arena = request.json["npcFavoredArena"].split("_")[0]

    # Beginning of making character_profile stats
    gender = utilities.random_with_list(gender_list)
    drives_data_into_list = utilities.file_list_into_var(
        set_static_files_location + "npc_stats/drives.txt", "txt"
    )
    traits_data_into_list = utilities.file_list_into_var(
        set_static_files_location + "npc_stats/traits.txt", "txt"
    )
    creature_list = utilities.file_list_into_var(
        set_static_files_location
        + "creatures_folder/{}_creatures.txt".format(given_pantheon),
        "txt",
    )
    npc_base_stats = utilities.file_list_into_var(
        set_static_files_location + "npc_stats/base_stats.json", "json"
    )
    qualities_list = utilities.file_list_into_var(
        set_static_files_location + "npc_stats/qualities.json", "json"
    )
    flairs_list = utilities.file_list_into_var(
        set_static_files_location + "npc_stats/flairs.json", "json"
    )

    if shortened_npc_favored_arena == "Combat":
        nonfavored_arena = "Social"

    if shortened_npc_favored_arena == "Social":
        nonfavored_arena = "Combat"

    if npc_type == "Mook":
        pass
    elif npc_type == "Professional":
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Professional_" + shortened_npc_favored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Professional_" + nonfavored_arena]
        )
    elif npc_type == "Villain" or npc_type == "Monster":
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Professional_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Villain_" + shortened_npc_favored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Professional_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Villain_" + nonfavored_arena])
    elif npc_type == "Foe":
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Professional_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Villain_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Foe_" + shortened_npc_favored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Professional_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Villain_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Foe_" + nonfavored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Foe_" + shortened_npc_favored_arena]
        )
        qualities_list[nonfavored_arena].extend(
            qualities_list["Foe_" + nonfavored_arena])
    elif npc_type == "Rival":
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Professional_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Villain_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Foe_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Rival_" + shortened_npc_favored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Professional_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Villain_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Foe_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Rival_" + nonfavored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Foe_" + shortened_npc_favored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Rival_" + shortened_npc_favored_arena]
        )
        qualities_list[nonfavored_arena].extend(
            qualities_list["Foe_" + nonfavored_arena])
        qualities_list[nonfavored_arena].extend(
            qualities_list["Rival_" + nonfavored_arena])
    elif npc_type == "Nemesis" or npc_type == "Titanspawn":
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Professional_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Villain_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Foe_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Rival_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Nemesis_" + shortened_npc_favored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Professional_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Villain_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Foe_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Rival_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Nemesis_" + nonfavored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Foe_" + shortened_npc_favored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Rival_" + shortened_npc_favored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Nemesis_" + shortened_npc_favored_arena]
        )
        qualities_list[nonfavored_arena].extend(
            qualities_list["Foe_" + nonfavored_arena])
        qualities_list[nonfavored_arena].extend(
            qualities_list["Rival_" + nonfavored_arena])
        qualities_list[nonfavored_arena].extend(
            qualities_list["Nemesis_" + nonfavored_arena])
    else:
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Professional_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Villain_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Foe_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Rival_" + shortened_npc_favored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Nemesis_" + shortened_npc_favored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Professional_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Villain_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Foe_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Rival_" + nonfavored_arena]
        )
        flairs_list[nonfavored_arena].extend(
            flairs_list["Nemesis_" + nonfavored_arena]
        )
        flairs_list[shortened_npc_favored_arena].extend(
            flairs_list["Demigod"]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Foe_" + shortened_npc_favored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Rival_" + shortened_npc_favored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Nemesis_" + shortened_npc_favored_arena]
        )
        qualities_list[nonfavored_arena].extend(
            qualities_list["Foe_" + nonfavored_arena]
        )
        qualities_list[nonfavored_arena].extend(
            qualities_list["Rival_" + nonfavored_arena]
        )
        qualities_list[nonfavored_arena].extend(
            qualities_list["Nemesis_" + nonfavored_arena]
        )
        qualities_list[shortened_npc_favored_arena].extend(
            qualities_list["Demigod"]
        )

    if is_name_generic == "yes":
        name_list = utilities.file_list_into_var(
            set_static_files_location
            + "names_folder/generic_{}_names.txt".format(gender),
            "txt",
        )
    else:
        name_list = utilities.file_list_into_var(
            set_static_files_location
            + "names_folder/{}_{}_names.txt".format(given_pantheon, gender),
            "txt",
        )

    if npc_type == "Professional" and npc_favored_arena == "Social":
        npc_base_stats[npc_type]["Flairs"] = 1

    character_profile["Name"] = utilities.random_with_list(name_list)
    character_profile["Gender"] = gender.capitalize()
    character_profile["Traits"] = utilities.random_with_list(
        traits_data_into_list, selected_count=3
    )
    character_profile["Drive"] = utilities.random_with_list(
        drives_data_into_list)
    character_profile["Pantheon"] = given_pantheon
    character_profile["Attitude towards player"] = utilities.random_with_list(
        attitude_list, weighting=(2, 4, 10, 20, 30, 15, 30, 20, 10, 4, 2)
    )
    if human == "yes":
        character_profile["Apart of Cult?"] = utilities.random_with_list(
            cult_types, weighting=(2, 20, 3, 20, 10, 15, 40, 40, 150)
        )
    else:
        character_profile["Creature Type"] = utilities.random_with_list(
            creature_list)

    character_profile["Stats"] = npc_base_stats[npc_type]
    character_profile["Drawbacks"] = utilities.add_qualities_and_flairs(
        npc_base_stats, npc_type, "Drawbacks", "Drawbacks", qualities_list, "Full"
    )
    if npc_favored_arena == "Combat":
        character_profile["Qualities"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Qualities", "Combat", qualities_list, "Full"
        )
    elif npc_favored_arena == "Social":
        character_profile["Qualities"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Qualities", "Social", qualities_list, "Full"
        )
    elif npc_favored_arena == "Combat_focused":
        character_profile["Qualities"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Qualities", "Combat", qualities_list, "Major"
        )
        character_profile["Qualities"] += utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Qualities", "Social", qualities_list, "Minor"
        )
    elif npc_favored_arena == "Social_focused":
        character_profile["Qualities"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Qualities", "Social", qualities_list, "Major"
        )
        character_profile["Qualities"] += utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Qualities", "Combat", qualities_list, "Minor"
        )
    if npc_favored_arena == "Combat":
        character_profile["Flairs"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Flairs", "Combat", flairs_list, "Full"
        )
    elif npc_favored_arena == "Social":
        character_profile["Flairs"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Flairs", "Social", flairs_list, "Full"
        )
    elif npc_favored_arena == "Combat_focused":
        character_profile["Flairs"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Flairs", "Combat", flairs_list, "Major"
        )
        character_profile["Flairs"] += utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Flairs", "Social", flairs_list, "Minor"
        )
    elif npc_favored_arena == "Social_focused":
        character_profile["Flairs"] = utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Flairs", "Social", flairs_list, "Major"
        )
        character_profile["Flairs"] += utilities.add_qualities_and_flairs(
            npc_base_stats, npc_type, "Flairs", "Combat", flairs_list, "Minor"
        )
    add_vulnerability = any(
        "Incorporeality" or "Regeneration" or "Unseen" or "Indestructible" in d for d in character_profile["Qualities"]
    ) and not any("Vulnerability" in d for d in character_profile["Drawbacks"])
    if add_vulnerability:
        character_profile["Drawbacks"].append(qualities_list["Drawbacks"][0])

    toxic_exists = any("Toxic" in d for d in character_profile["Qualities"])

    if toxic_exists:
        toxic_vectors = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/toxic_vectors.txt", "txt"
        )
        character_profile["Toxic"] = {
            "Vector": utilities.random_with_list(toxic_vectors),
            "Duration": "Successes in Rounds",
            "Condition": "Inflict Damage Stunt",
            "Note": "Simple action Resolve + Sta roll to end effect early",
        }

    vulnerability_exists = any("Vulnerability" in d for d in character_profile["Drawbacks"])

    if vulnerability_exists:
        vulnerability_list = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/vulnerabilities.txt", "txt"
        )
        character_profile["Vulnerability"] = utilities.random_with_list(
            vulnerability_list
        )

    sorcery_exists = any("Sorcery" in d for d in character_profile["Flairs"])

    if sorcery_exists:
        sorcery_list = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/purviews.json", "json"
        )
        pantheon_sorcery_list = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/pantheon_purviews.json", "json"
        )
        pantheon_purview_sorcery = {
            given_pantheon: pantheon_sorcery_list[given_pantheon]
        }
        sorcery_list.update(pantheon_purview_sorcery)
        sorcery_key = random.choices(list(sorcery_list))[0]
        sorcery_value = sorcery_list[sorcery_key]
        character_profile["Sorcery"] = {sorcery_key: sorcery_value}

    dominion_exists = any("Dominion" in d for d in character_profile["Qualities"])

    if dominion_exists:
        dominion_list = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/purviews.json", "json"
        )
        pantheon_dominion_list = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/pantheon_purviews.json", "json"
        )
        pantheon_purview_dominion = {
            given_pantheon: pantheon_dominion_list[given_pantheon]
        }
        dominion_list.update(pantheon_purview_dominion)
        dominion_key = random.choices(list(dominion_list))[0]
        dominion_value = dominion_list[dominion_key]
        character_profile["Dominion"] = {dominion_key: dominion_value}

    relic_exists = any("Mystic Arsenal" in d for d in character_profile["Qualities"])

    if relic_exists:
        relic_list = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/purviews.json", "json"
        )
        pantheon_relic_list = utilities.file_list_into_var(
            set_static_files_location + "npc_stats/pantheon_purviews.json", "json"
        )
        pantheon_purview_relic = {
            given_pantheon: pantheon_relic_list[given_pantheon]
        }
        relic_list.update(pantheon_purview_relic)
        relic_key = random.choices(list(relic_list))[0]
        relic_value = relic_list[relic_key]
        character_profile["Relic"] = {relic_key: relic_value}

    for quality in character_profile["Qualities"]:
        if "base_stat_changes" in quality[next(iter(quality))]:
            stats_changes = quality[next(iter(quality))]["base_stat_changes"]
            for item in stats_changes.items():
                if item[0] in character_profile["Stats"]:
                    character_profile["Stats"][item[0]] += item[1]
                else:
                    character_profile["Stats"][item[0]] = item[1]

    id = uuid.uuid4().hex
    character_profile["id"] = id
    response = dynamodb.write_to_npc_gen(id, character_profile)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        return {"msg": "Added npc successfully", "id": id, "char": character_profile}
    return {"msg": "Some error occurred", "response": response}


@routes_blueprint.route("/npc/<id>", methods=["GET"])
def get_npc(id):
    """
    Get NPC from DB based off of their ID
    """

    response = dynamodb.get_npc_gen_by_id(id)
    if response["ResponseMetadata"]["HTTPStatusCode"] == 200:
        if "Item" in response:
            return response["Item"]["npc"]
        return {"msg": "Item not found!"}
    return {"msg": "Some error occurred", "response": response}


@routes_blueprint.route("/health", methods=["GET"])
def get_health_check():
    """
    Simple health check
    """
    return {"msg": "200 OK"}

# TODO - This needs re-work for AWS deployment
# @routes_blueprint.before_app_first_request
# def getTable():
#     """
#     Before first request, check to see if table exists or not.
#     If table doesn't, this function provides a way to create the
#     table before making first request to it.
#     """

#     try:
#         dynamodb.create_table_npc_gen()
#         current_app.logger.info("\n\n**** Table has been created for you ****\n")
#         return {"msg": "Table has been created for you."}
#     except:
#         current_app.logger.info("\n\n**** Table already exist ****\n")
#         return {"msg": "Table already exist."}
