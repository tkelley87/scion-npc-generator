#!/bin/sh

echo "Sleeping for 0.5 seconds..."
sleep 0.5

# /bin/sed -i "s/{{AWS_ACCESS_KEY_ID}}/$AWS_ACCESS_KEY_ID/g" .env
# /bin/sed -i "s/{{AWS_SECRET_ACCESS_KEY}}/$AWS_SECRET_ACCESS_KEY/g" .env
/bin/sed -i "s/{{REGION_NAME}}/$REGION_NAME/g" .env
# /bin/sed -i "s|{{DYNAMODB_URI}}|$DYNAMODB_URI|g" .env
/bin/sed -i "s/{{CONFIG_TYPE}}/$CONFIG_TYPE/g" .env
/bin/sed -i "s|{{FLASK_APP}}|$FLASK_APP|g" .env

echo "Sleeping for 0.5 seconds..."
sleep 0.5

exec gunicorn -b :5000 --log-level=warning app:app