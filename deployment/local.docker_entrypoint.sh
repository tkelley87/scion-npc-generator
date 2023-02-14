#!/bin/sh

### BEGINNING ###
### This is simulating getting the secrets from secrets manager.

### These secrets are injected into the Task Definition before
### the container begins building from the image.
export AWS_ACCESS_KEY_ID=dummy
export AWS_SECRET_ACCESS_KEY=dummy
export REGION_NAME=dummy
export DYNAMODB_URI=http://dynamodb-local:8000
export CONFIG_TYPE=config.localDockerConfig
export FLASK_APP=app.py

echo $AWS_ACCESS_KEY_ID
echo $AWS_SECRET_ACCESS_KEY
echo $REGION_NAME
echo $DYNAMODB_URI
echo $CONFIG_TYPE
echo $FLASK_APP
### ENDING    ###

echo "Sleeping for 0.5 seconds..."
sleep 0.5

/bin/sed -i "s/{{AWS_ACCESS_KEY_ID}}/$AWS_ACCESS_KEY_ID/g" .env
/bin/sed -i "s/{{AWS_SECRET_ACCESS_KEY}}/$AWS_SECRET_ACCESS_KEY/g" .env
/bin/sed -i "s/{{REGION_NAME}}/$REGION_NAME/g" .env
/bin/sed -i "s|{{DYNAMODB_URI}}|$DYNAMODB_URI|g" .env
/bin/sed -i "s/{{CONFIG_TYPE}}/$CONFIG_TYPE/g" .env
/bin/sed -i "s|{{FLASK_APP}}|$FLASK_APP|g" .env

echo "Sleeping for 0.5 seconds..."
sleep 0.5

exec gunicorn -b :5000 --log-level=debug app:app

"""
If you need to test locally on an M1 Mac, you can create a separate file that
you can run these commands in zsh.
"""
# sed -i '' "s/{{AWS_ACCESS_KEY_ID}}/$AWS_ACCESS_KEY_ID/g" .env.local
# sed -i '' "s/{{AWS_SECRET_ACCESS_KEY}}/$AWS_SECRET_ACCESS_KEY/g" .env.local
# sed -i '' "s/{{REGION_NAME}}/$REGION_NAME/g" .env.local
# sed -i '' "s|{{DYNAMODB_URI}}|$DYNAMODB_URI|g" .env.local
# sed -i '' "s/{{CONFIG_TYPE}}/$CONFIG_TYPE/g" .env.local
# sed -i '' "s|{{FLASK_APP}}|$FLASK_APP|g" .env.local
