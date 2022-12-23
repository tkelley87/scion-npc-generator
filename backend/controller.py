from boto3 import resource

import config
import boto3

AWS_ACCESS_KEY_ID = config.AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY = config.AWS_SECRET_ACCESS_KEY
REGION_NAME = config.REGION_NAME

resource = resource(
    "dynamodb",
    endpoint_url="http://localhost:8000/",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=REGION_NAME,
    verify=False,
)

dynamodb_client = boto3.client(
    "dynamodb",
    endpoint_url="http://localhost:8000/",
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=REGION_NAME,
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
            ProvisionedThroughput={"ReadCapacityUnits": 10, "WriteCapacityUnits": 10},
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
    response = NpcGenTable.put_item(
        Item={
            "id": id,
            "npc": NPC,
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
    # print('This is response back => ', response["Item"]["npc"])
    return response
