### How to connect Flask to ReactJs
Following this guide: [https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i](https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i)

### Setting up project venv
1) Setup Python Virtual Environment
    - `python3 -m venv venv`
2) You can activate it by running
    - `source venv/bin/activate`
3) Installing packages from requirements.txt
    - `pip install -r requirements.txt`
    - `pip freeze > requirements.txt`

### Running FE/BE after venv setup
1) Have two terminals open for easy debugging, first terminal to start
React with this command
    - `npm start`
2) Within the second terminal to start our Flask App
    - `npm run start-backend`
