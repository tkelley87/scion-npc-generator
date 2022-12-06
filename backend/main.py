import sys
import random
import json

character_profile = {}
given_pantheon = sys.argv[1]
npc_type = sys.argv[2]
human = sys.argv[3]
is_name_generic = sys.argv[4]
npc_favored_arena = sys.argv[5]
shortened_npc_favored_arena = sys.argv[5].split("_")[0]
gender_list = ["male", "female"]
attitude_list = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
cult_types = ["Coven", "Guild", "Family Tradition", "Historian", "Mystery Society", "Reliquarian", "Social Club",
              "Temple", "No"]


def file_list_into_var(filepath, file_type):
    file = open(filepath, "r")
    if file_type == 'txt':
        file_data = file.read()
        return file_data.split("\n")
    elif file_type == 'json':
        return json.load(file)


def random_with_list(given_list, weighting=None, selected_count=None):
    if weighting and selected_count:
        return random.choices(given_list, weights=weighting, k=selected_count)
    elif weighting:
        return random.choices(given_list, weights=weighting, k=1)[0]
    elif selected_count:
        return random.sample(given_list, k=selected_count)
    else:
        return random.sample(given_list, k=1)[0]


def add_qualities_and_flairs(npc_base_stats, npc_archetype, quality_type_from_stats, quality_from_list, qualities_list,
                             count_amount):
    quality_type_count = npc_base_stats[npc_archetype][quality_type_from_stats]
    if quality_type_count > 0:
        if count_amount == "Full":
            return random.sample(qualities_list[quality_from_list], k=quality_type_count)
        elif count_amount == "Major":
            return random.sample(qualities_list[quality_from_list], k=quality_type_count-1)
        elif count_amount == "Minor":
            return random.sample(qualities_list[quality_from_list], k=1)
    else:
        return []


def main():
    gender = random_with_list(gender_list)
    drives_data_into_list = file_list_into_var("npc_stats/drives.txt", "txt")
    traits_data_into_list = file_list_into_var("npc_stats/traits.txt", "txt")
    creature_list = file_list_into_var("creatures_folder/{}_creatures.txt".format(given_pantheon), "txt")
    npc_base_stats = file_list_into_var("npc_stats/base_stats.json", "json")
    qualities_list = file_list_into_var("npc_stats/qualities.json", "json")
    flairs_list = file_list_into_var("npc_stats/flairs.json", "json")
    if shortened_npc_favored_arena == "Combat":
        nonfavored_arena = "Social"
    if shortened_npc_favored_arena == "Social":
        nonfavored_arena = "Combat"
    if npc_type == "Mook":
        pass
    elif npc_type == "Professional":
        flairs_list[shortened_npc_favored_arena].extend(flairs_list["Professional_" + shortened_npc_favored_arena])
        flairs_list[nonfavored_arena].extend(flairs_list["Professional_" + nonfavored_arena])
    else:
        flairs_list[shortened_npc_favored_arena].extend(flairs_list["Professional_" + shortened_npc_favored_arena])
        flairs_list[shortened_npc_favored_arena].extend(flairs_list["Villain_" + shortened_npc_favored_arena])
        flairs_list[nonfavored_arena].extend(flairs_list["Professional_" + nonfavored_arena])
        flairs_list[nonfavored_arena].extend(flairs_list["Villain_" + nonfavored_arena])
    if is_name_generic == 'yes':
        name_list = file_list_into_var("names_folder/generic_{}_names.txt".format(gender), "txt")
    else:
        name_list = file_list_into_var("names_folder/{}_{}_names.txt".format(given_pantheon, gender), "txt")
    if npc_type == "Professional" and npc_favored_arena == "Social":
        npc_base_stats[npc_type]["Flairs"] = 1
    character_profile["Name"] = random_with_list(name_list)
    character_profile["Gender"] = gender.capitalize()
    character_profile["Traits"] = random_with_list(traits_data_into_list, selected_count=3)
    character_profile["Drive"] = random_with_list(drives_data_into_list)
    character_profile["Pantheon"] = given_pantheon
    character_profile["Attitude towards player"] = random_with_list(attitude_list, weighting=(2, 4, 10, 20, 30, 15, 30,
                                                                                              20, 10, 4, 2))
    if human == 'yes':
        character_profile["Apart of Cult?"] = random_with_list(cult_types, weighting=(2, 20, 3, 20, 10, 15, 40, 40,
                                                                                      150))
    else:
        character_profile["Creature Type"] = random_with_list(creature_list)
    character_profile["Stats"] = npc_base_stats[npc_type]
    character_profile["Drawbacks"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Drawbacks", "Drawbacks",
                                                              qualities_list, "Full")
    if npc_favored_arena == "Combat":
        character_profile["Qualities"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Qualities", "Combat",
                                                                  qualities_list, "Full")
    elif npc_favored_arena == "Social":
        character_profile["Qualities"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Qualities", "Social",
                                                                  qualities_list, "Full")
    elif npc_favored_arena == "Combat_focused":
        character_profile["Qualities"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Qualities", "Combat",
                                                                  qualities_list,  "Major")
        character_profile["Qualities"] += add_qualities_and_flairs(npc_base_stats, npc_type, "Qualities", "Social",
                                                                   qualities_list, "Minor")
    elif npc_favored_arena == "Social_focused":
        character_profile["Qualities"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Qualities", "Social",
                                                                  qualities_list, "Major")
        character_profile["Qualities"] += add_qualities_and_flairs(npc_base_stats, npc_type, "Qualities", "Combat",
                                                                   qualities_list, "Minor")
    if npc_favored_arena == "Combat":
        character_profile["Flairs"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Flairs", "Combat",
                                                               flairs_list, "Full")
    elif npc_favored_arena == "Social":
        character_profile["Flairs"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Flairs", "Social",
                                                               flairs_list, "Full")
    elif npc_favored_arena == "Combat_focused":
        character_profile["Flairs"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Flairs", "Combat",
                                                               flairs_list,  "Major")
        character_profile["Flairs"] += add_qualities_and_flairs(npc_base_stats, npc_type, "Flairs", "Social",
                                                                flairs_list, "Minor")
    elif npc_favored_arena == "Social_focused":
        character_profile["Flairs"] = add_qualities_and_flairs(npc_base_stats, npc_type, "Flairs", "Social",
                                                               flairs_list, "Major")
        character_profile["Flairs"] += add_qualities_and_flairs(npc_base_stats, npc_type, "Flairs", "Combat",
                                                                flairs_list, "Minor")
    add_vulnerability = any("Incorporeality" in d for d in
                            character_profile["Qualities"]) and not any("Vulnerability" in d for d in
                                                                        character_profile["Drawbacks"])
    if add_vulnerability:
        character_profile["Drawbacks"].append(qualities_list["Drawbacks"][0])
    toxic_exists = any("Toxic" in d for d in character_profile["Qualities"])
    if toxic_exists:
        toxic_vectors = file_list_into_var("npc_stats/toxic_vectors.txt", "txt")
        character_profile["Toxic"] = {"Vector": random_with_list(toxic_vectors), "Duration": "Successes in Rounds",
                                      "Condition": "Inflict Damage Stunt",
                                      "Note": "Simple action Resolve + Sta roll to end effect early"}
    vulnerability_exists = any("Vulnerability" in d for d in character_profile["Drawbacks"])
    if vulnerability_exists:
        vulnerability_list = file_list_into_var("npc_stats/vulnerabilities.txt", "txt")
        character_profile["Vulnerability"] = random_with_list(vulnerability_list)
    sorcery_exists = any("Sorcery" in d for d in character_profile["Flairs"])
    if sorcery_exists:
        sorcery_list = file_list_into_var("npc_stats/purviews.json", "json")
        pantheon_sorcery_list = file_list_into_var("npc_stats/pantheon_purviews.json", "json")
        pantheon_purview_sorcery = {given_pantheon: pantheon_sorcery_list[given_pantheon]}
        sorcery_list.update(pantheon_purview_sorcery)
        sorcery_key = random.choices(list(sorcery_list))[0]
        sorcery_value = sorcery_list[sorcery_key]
        character_profile["Sorcery"] = {sorcery_key: sorcery_value}
    for quality in character_profile["Qualities"]:
        if "Base Stat Changes" in quality[next(iter(quality))]:
            stats_changes = quality[next(iter(quality))]["Base Stat Changes"]
            for item in stats_changes.items():
                if item[0] in character_profile["Stats"]:
                    character_profile["Stats"][item[0]] += item[1]
                else:
                    character_profile["Stats"][item[0]] = item[1]
    print(character_profile)


if __name__ == "__main__":
    main()
