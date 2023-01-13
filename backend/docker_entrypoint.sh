#!/bin/bash

### BEGINNING ###
### This is simulating getting the secrets from secrets manager
export AWS_ACCESS_KEY_ID=dummy
export AWS_SECRET_ACCESS_KEY=dummy
export REGION_NAME=dummy
export DYNAMODB_URI=http://dynamodb-local:8000

echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY
echo $REGION_NAME
echo $DYNAMODB_URI
### ENDING    ###

/bin/sed -i "s/{{AWS_ACCESS_KEY_ID}}/$AWS_ACCESS_KEY_ID/g" .env
/bin/sed -i "s/{{AWS_SECRET_ACCESS_KEY}}/$AWS_SECRET_ACCESS_KEY/g" .env
/bin/sed -i "s/{{REGION_NAME}}/$REGION_NAME/g" .env
/bin/sed -i "s|{{DYNAMODB_URI}}|$DYNAMODB_URI|g" .env

exec gunicorn -b :5000 app:app