#!/bin/sh

echo $PWD

cd ../../
echo $PWD
npm start &

cd backend/
echo $PWD
./venv/bin/flask run --no-debugger