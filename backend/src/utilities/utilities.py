import json
import random


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
        return random.sample(given_list, k=selected_count)
    else:
        return random.choices(given_list)[0]


def add_qualities_and_flairs(
    npc_base_stats,
    npc_archetype,
    quality_type_from_stats,
    quality_from_list,
    qualities_list,
    count_amount,
):
    quality_type_count = npc_base_stats[npc_archetype][quality_type_from_stats]
    if quality_type_count > 0:
        if count_amount == "Full":
            return random.sample(
                qualities_list[quality_from_list], k=quality_type_count
            )
        elif count_amount == "Major":
            return random.sample(
                qualities_list[quality_from_list], k=quality_type_count - 1
            )
        elif count_amount == "Minor":
            return random.sample(qualities_list[quality_from_list], k=1)
    else:
        return []
