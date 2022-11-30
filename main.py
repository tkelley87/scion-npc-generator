import sys
import random

character_profile = {}
given_pantheon = sys.argv[1]
npc_type = sys.argv[2]
human = sys.argv[3]
gender_list = ["male", "female"]
male_name_list = ["Thomas", "James"]
female_name_list = ["Susan", "Allison"]
attitude_list = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]
norse_creature_types = ["Dökkálfar", "Ljósálfar"]
greek_creature_types = ["Centaur", "Minotaur"]
cult_types = ["Coven", "Guild", "Family Tradition", "Historian", "Mystery Society", "Reliquarian", "Social Club",
              "Temple", "No"]
mook_base_stats = {"Primary Pool": 5, "Secondary Pool": 4, "Desperation Pool": 2, "Health": 1, "Defense": 1,
                   "Initiative": 3}
professional_base_stats = {"Primary Pool": 7, "Secondary Pool": 5, "Desperation Pool": 3, "Health": 2, "Defense": 2,
                           "Initiative": 5}
villain_base_stats = {"Primary Pool": 9, "Secondary Pool": 7, "Desperation Pool": 5, "Health": 4, "Defense": 3,
                      "Initiative": 7}
monster_base_stats = {"Primary Pool": 11, "Secondary Pool": 9, "Desperation Pool": 5, "Health": 6, "Defense": 4,
                      "Initiative": 9}


# Drives List Transformation
drives_file = open("drives.txt", "r")
drives_data = drives_file.read()
drives_data_into_list = drives_data.split("\n")

# Traits List Transformation
traits_file = open("traits.txt", "r")
traits_data = traits_file.read()
traits_data_into_list = traits_data.split("\n")


def random_with_list(list, weighting=None, selected_count=None):
    if weighting and selected_count:
        return random.choices(list, weights=weighting, k=selected_count)
    elif weighting:
        return random.choices(list, weights=weighting)[0]
    elif selected_count:
        return random.choices(list, k=selected_count)
    else:
        return random.choices(list)[0]


def random_with_global(global_variable, list_name):
    return random.choice(globals()[global_variable + list_name])


def main():
    gender = random_with_list(gender_list)
    character_profile["Name"] = random_with_global(gender, "_name_list")
    character_profile["Gender"] = gender
    character_profile["Traits"] = random_with_list(traits_data_into_list, selected_count=3)
    character_profile["Drive"] = random_with_list(drives_data_into_list)
    character_profile["Pantheon"] = given_pantheon
    character_profile["Attitude towards player"] = random_with_list(attitude_list, weighting=(2, 4, 10, 20, 30, 15, 30, 20, 10, 4, 2))
    if human == 'yes':
        character_profile["Apart of Cult?"] = random_with_list(cult_types, weighting=(2, 20, 3, 20, 10, 15, 40, 40, 150))
    else:
        character_profile["Creature Type"] = random_with_global(given_pantheon, "_creature_types")
    character_profile["Stats"] = globals()[npc_type + "_base_stats"]
    print(character_profile)


if __name__ == "__main__":
    main()
