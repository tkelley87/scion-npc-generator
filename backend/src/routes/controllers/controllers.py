from flask import request, redirect, url_for, current_app, abort
from boto3 import resource

import boto3
import time

resource = resource(
    "dynamodb",
    # endpoint_url=current_app.config["DYNAMODB_URI"],
    # aws_access_key_id=current_app.config["AWS_ACCESS_KEY_ID"],
    # aws_secret_access_key=current_app.config["AWS_SECRET_ACCESS_KEY"],
    region_name=current_app.config["REGION_NAME"],
    # verify=False,
)

dynamodb_client = boto3.client(
    "dynamodb",
    endpoint_url=current_app.config["DYNAMODB_URI"],
    aws_access_key_id=current_app.config["AWS_ACCESS_KEY_ID"],
    aws_secret_access_key=current_app.config["AWS_SECRET_ACCESS_KEY"],
    region_name=current_app.config["REGION_NAME"],
    verify=False,
)


def create_table_npc_gen():
    try:
        table = dynamodb_client.create_table(
            TableName="NpcGen",  # Name of the table
            KeySchema=[
                {
                    "AttributeName": "id",
                    "KeyType": "HASH",  # HASH = partition key, RANGE = sort key
                }
            ],
            AttributeDefinitions=[
                {
                    "AttributeName": "id",  # Name of the attribute
                    "AttributeType": "S",  # N = Number (S = String, B= Binary)
                }
            ],
            ProvisionedThroughput={
                "ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
        )
        return table
    except dynamodb_client.exceptions.ResourceInUseException as error:
        raise error


NpcGenTable = resource.Table("NpcGen")


def delete_from_npc_gen(id):
    response = NpcGenTable.delete_item(Key={"id": id})

    return response


def write_to_npc_gen(id, NPC):
    """
    Function to add npc generated to dynamo
    """
    six_hour_ttl = int(time.time()) + 21_600

    response = NpcGenTable.put_item(
        Item={
            "id": id,
            "npc": NPC,
            "ttl": six_hour_ttl,
        }
    )
    return response


def get_npc_gen_by_id(id):
    response = NpcGenTable.get_item(
        Key={"id": id},
        AttributesToGet=[
            "npc",
        ],
    )
    return response
