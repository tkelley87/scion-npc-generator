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


def random_with_list(list, weighting=None):
    if weighting:
        return random.choices(list, weights=weighting)[0]
    else:
        return random.choices(list)[0]


def random_with_global(global_variable, list_name):
    return random.choice(globals()[global_variable + list_name])


def main():
    gender = random_with_list(gender_list)
    character_profile["Name"] = random_with_global(gender, "_name_list")
    character_profile["Gender"] = gender
    character_profile["Pantheon"] = given_pantheon
    character_profile["Attitude towards player"] = random_with_list(attitude_list, weighting=(2, 4, 10, 20, 30, 15, 30, 20, 10, 4, 2))
    if human == 'yes':
        character_profile["Apart of Cult?"] = random_with_list(cult_types, weighting=(2, 20, 3, 20, 10, 15, 40, 40, 100))
    else:
        character_profile["Creature Type"] = random_with_global(given_pantheon, "_creature_types")
    print(character_profile)


if __name__ == "__main__":
    main()
