# Scion NPC Generator

### Terraform/Github Actions deployment

- Following this guide: [https://engineering.finleap.com/posts/2020-02-20-ecs-fargate-terraform/](https://engineering.finleap.com/posts/2020-02-20-ecs-fargate-terraform/)

### How to connect Flask to ReactJs

- Following this guide: [https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i](https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i)

##### Setting up project venv

1. Setup Python Virtual Environment
   - `python3 -m venv venv`
2. You can activate it by running
   - `source venv/bin/activate`
3. Installing packages from **_requirements.txt_**
   - `pip3 install -r requirements.txt`
4. Getting packages from flask and setting them to **_requirements.txt_**
   - `pip3 freeze > requirements.txt`

##### Running FE/BE after venv setup

- ###### Running individual services without Docker
   1) To run React, open terminal at **root** directory of project.
      - `npm start`

   2) To run Flask, from project **root** directory.
      - `cd backend && ./venv/bin/flask run --no-debugger`

##### Running complete app with Docker Compose Locally

- Bring docker up and check for changes in images.
   - `docker compose up --build`
- To bring docker down **- Important!**
     - `docker compose down`

##### Run individual service with Docker Compose Locally

1. `docker compose up -d `**_`insert service name from docker-compose.yml`_**
   - **_e.g._**
     - `docker compose up -d client`
     - `docker compose up -d api`
     - `docker compose up -d dynamodb-local`
