## Imports
from datetime import datetime
import json
import re

from socket import socket
from xmlrpc.client import boolean ## Sockets de comunicacion
from flask import Flask, jsonify, request  ## Import especifico de Flask
from flask_cors import CORS ## Import que permite el CORS origins de Flask
from flask_socketio import SocketIO
from sqlalchemy import false, true ## Modulo Socket Flask
from src.Equipos.Teams import Squads
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (create_access_token)
from flask_jwt_extended import JWTManager
from user_database_setup import LocalUser

## importa Endpoints
from src.Equipos.team import team_service
import user_database_service



## Definicion de la aplicacion
app = Flask(__name__)
CORS(app, resources={r"/*":{"origins":'*'}})
socket = SocketIO(app,cors_allowed_origins="*") ## Definimos Cors
app.config['JWT_SECRET_KEY']='secret'
bcrypt=Bcrypt(app)
jwt=JWTManager(app)

## BluePrint --- routes de Endpoints
app.register_blueprint(team_service, url_prefix="/api")

## Endpoint Principal
@app.route('/', methods = ['GET'])
def aplicacion():
    return jsonify({
        "Curso" : "Introduccion a la programacion y computacion 1 - USAC"
    })


@app.route('/user/register', methods=['POST'])
def register():
    r_first_name=request.get_json()['first_name']
    r_last_name=request.get_json()['last_name']
    r_email=request.get_json()['email']
    r_comp=request.get_json()['password']
    r_password=bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    result=""
    
    if user_database_service.if_email_domain(r_email) == False:
        result="Invalid Email"
        print(result)
        return jsonify({'result': result})

    if user_database_service.if_user_exists(r_email):
        result="user already exists"
        print(result)
        return jsonify({'result': result})

    if user_database_service.if_user_number(r_first_name, r_last_name) == False:
        result="The Names are invalid"
        print(result)
        return jsonify({'result': result})

    if len(r_comp) < 5:
        result="Password Length"
        print(result)
        return jsonify({'result': result})
    r_comp = ""
     
    new_user=LocalUser(first_name=r_first_name, last_name=r_last_name, email=r_email, password=r_password, created=datetime.utcnow())
    added=user_database_service.add_user(new_user)
    if added is True:
        result="user successfully added"
        print(result)
    else:
        result="unable to add"
        print(result)
    return jsonify({'result': result})


@app.route('/user/login', methods=['POST'])
def login():
    email=request.get_json()['email']
    password=request.get_json()['password']
    result=""

    response_user=user_database_service.get_user(email)

    if response_user:
        if bcrypt.check_password_hash(response_user.password, password):
            access_token=create_access_token(
                identity=
                {
                    'first_name': response_user.first_name,
                    'last_name': response_user.last_name,
                    'email': response_user.email
                }
            )
            print("aca",result)
            result=jsonify({'token': access_token})
        else:
            print("aca",result)
            result=jsonify({'error': 'Invalid username or password'})
    return result

## Inicializar el Server
if __name__ == "__main__":
    app.run(host="localhost", port = '3000', debug = False)


