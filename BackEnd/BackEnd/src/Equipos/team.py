import json
from operator import length_hint
from xml.sax.handler import property_interning_dict
from src.Equipos.TeamsInfo import Equipos
import requests
from src.Equipos.Teams import Squads
from flask import Blueprint, jsonify, request, Response
from datetime import datetime

team_service = Blueprint(name="team_service", import_name=__name__)

## Variables Globales
league_id = 2

Usuario = []
TeamModel = []
## definir peticiones teams

@team_service.route('/teams', methods=['GET'])
def informacion_equipo():
    try:
        return Equipos
    except Exception as e:
        return jsonify({
                "estado":1,
                "respuesta":e,
                "mensaje": "El servidor no responde" + str(e)
            }),500


@team_service.route('/PosTable', methods=['GET'])
def informacion_Tabla():
    try:

       

        url = "https://api-football-v1.p.rapidapi.com/v2/leagueTable/4335"

        headers = {
            "X-RapidAPI-Key": "f3360be12fmshd52dc195a33e4a5p157294jsnfcca79ac346f",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers)
        dataTable = json.loads(str(response.text))
        
        PositionTable = []
        for x in range(len(dataTable['api']['standings'][0])):
    
            Rank = {
                "Rank":dataTable['api']['standings'][0][x]['rank'],
                "TeamLogo":dataTable['api']['standings'][0][x]['logo'],
                "TeamName":dataTable['api']['standings'][0][x]['teamName'],
                "Played":dataTable['api']['standings'][0][x]['all']['matchsPlayed'],
                "Wins":dataTable['api']['standings'][0][x]['all']['win'],
                "Draws":dataTable['api']['standings'][0][x]['all']['draw'],
                "Loses":dataTable['api']['standings'][0][x]['all']['lose'],
                "GoalsFavor":dataTable['api']['standings'][0][x]['all']['goalsFor'],
                "GoalsAgainst":dataTable['api']['standings'][0][x]['all']['goalsAgainst'],
                "GoalDiference":dataTable['api']['standings'][0][x]['goalsDiff'],
                "Points":dataTable['api']['standings'][0][x]['points']
            }
            PositionTable.append(Rank)

            ## Termina procesamiento de datos

        return PositionTable
                    
    except Exception as e:
            return jsonify({
                    "estado":1,
                    "respuesta":e,
                    "mensaje": "El servidor no responde" + str(e)
                }),500

@team_service.route('/Team/<string:TeamID>', methods=['GET'])
def informacion_Team(TeamID):
    
        url = "https://api-football-v1.p.rapidapi.com/v3/teams"

        querystring = {"id":TeamID}
        TeamI=[]
        headers = {
            "X-RapidAPI-Key": "f3360be12fmshd52dc195a33e4a5p157294jsnfcca79ac346f",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }

        response = requests.request("GET", url, headers=headers, params=querystring)

        dataTeam = json.loads(str(response.text))
       
        
        Team={
            "TeamID":dataTeam['response'][0]['team']['id'],
            "TeamName":dataTeam['response'][0]['team']['name'],
            "TeamLogo":dataTeam['response'][0]['team']['logo'],
            "TeamFounded":dataTeam['response'][0]['team']['founded'],
            "FieldName":dataTeam['response'][0]['venue']['name'],
            "FieldAddress":dataTeam['response'][0]['venue']['address'],
            "FieldCity":dataTeam['response'][0]['venue']['city'],
            "FieldCapacity":dataTeam['response'][0]['venue']['capacity'],
            "FieldImg":dataTeam['response'][0]['venue']['image']
        }
        TeamI.append(Team)
        return TeamI
    


@team_service.route('/Squads', methods=['GET'])
def informacion_Squads():
        try:
        
            return Squads   
                    
        except Exception as e:
            return jsonify({
                    "estado":"Error",
                    "respuesta":e,
                    "mensaje": "El servidor no responde" + str(e)
                }),500            

@team_service.route('/Squads/<string:teamID>', methods=['GET'])
def informacion_Squad(teamID):
    Jugadores=[]
    for x in range(len(Squads)):
        ##if str(Squads[x]['teamID'])
        if str(Squads[x]['TeamID']) == teamID:

            for y in range(len(Squads[x]['Squad'])):
                jugador = {
                    "Photo":Squads[x]['Squad'][y]['Photo'],
                    "PlayerAge":Squads[x]['Squad'][y]['PlayerAge'] ,
                    "PlayerID":Squads[x]['Squad'][y]['PlayerID'] ,
                    "PlayerName":Squads[x]['Squad'][y]['PlayerName'] ,
                    "PlayerNum":Squads[x]['Squad'][y]['PlayerNum'],
                    "Position": Squads[x]['Squad'][y]['Position']
                }
                Jugadores.append(jugador)
            
            return Jugadores


@team_service.route('/Player/<string:PlayerID>', methods=['GET'])
def Player_Stats(PlayerID):
    Player=[]
    Statitstics=[]
    url = "https://api-football-v1.p.rapidapi.com/v3/players"

    querystring = {"id":PlayerID,"season":"2022"}

    headers = {
	    "X-RapidAPI-Key": "f3360be12fmshd52dc195a33e4a5p157294jsnfcca79ac346f",
	    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
    }

    response = requests.request("GET", url, headers=headers, params=querystring)
    dataStats = json.loads(str(response.text))

    jugadorS={
        "NameTitle":dataStats['response'][0]['player']['name'],
        "FirstName":dataStats['response'][0]['player']['firstname'],
        "LastName":dataStats['response'][0]['player']['lastname'],
        "Age":dataStats['response'][0]['player']['age'],
        "BirthDate":dataStats['response'][0]['player']['birth']['date'],
        "Nationality":dataStats['response'][0]['player']["nationality"],
        "Height":dataStats['response'][0]['player']['height'],
        "Weight":dataStats['response'][0]['player']['weight'],
        "Photo":dataStats['response'][0]['player']['photo'],
        "Team":dataStats['response'][0]['statistics'][0]['team']['name'],
        "TeamLogo":dataStats['response'][0]['statistics'][0]['team']['logo'],
        
    }
    Player.append(jugadorS)
    League1=[]
    League2=[]
    League3=[]
    League4=[]
    League5=[]
    League6=[]
    League7=[]
    League8=[]
    League9=[]
    League10=[]
    for x in range(len(dataStats['response'][0]['statistics'])):
        
        leagueStats={
            
            "League":dataStats['response'][0]['statistics'][x]['league']['name'],
            "Country":dataStats['response'][0]['statistics'][x]['league']['country'],
            "Logo":dataStats['response'][0]['statistics'][x]['league']['logo'],
            "Flag":dataStats['response'][0]['statistics'][x]['league']['flag'],
            "Appearences":dataStats['response'][0]['statistics'][x]['games']['appearences'],
            "Minutes":dataStats['response'][0]['statistics'][x]['games']['minutes'],
            "Rating":dataStats['response'][0]['statistics'][x]['games']['rating'],
            "Yellow":dataStats['response'][0]['statistics'][x]['cards']['yellow'],
            "YellowRed":dataStats['response'][0]['statistics'][x]['cards']['yellowred'],
            "Red":dataStats['response'][0]['statistics'][x]['cards']['red'],
            "Goals":dataStats['response'][0]['statistics'][x]['goals']['total'],
            "Shots":dataStats['response'][0]['statistics'][x]['shots']['total'],
            "Pases":dataStats['response'][0]['statistics'][x]['passes']['total'],
        }
        if x == 0:
            League1=[]
            League1.append(leagueStats)
        elif x == 1:
            League2=[]
            League2.append(leagueStats)
        elif x == 2:
            League3=[]  
            League3.append(leagueStats)   
        elif x == 3:
            League4=[]
            League4.append(leagueStats)
        elif x == 4:
            League5=[]
            League5.append(leagueStats)
        elif x == 5:
            League6=[]
            League6.append(leagueStats)  
        elif x == 6:
            League7=[]
            League7.append(leagueStats)  
        elif x == 7:
            League8=[]
            League8.append(leagueStats)  
        elif x == 8:
            League9=[]
            League9.append(leagueStats)  
        elif x == 9:
            League10=[]
            League10.append(leagueStats)  
    
    
    
    return jsonify({
        "Jugador":Player,
        "Ligas":League1 + League2+ League3+League4+League5+League6+League7+League8+League9+League10
        }) 
            

##@team_service.route('/Squads/<string:teamID>', methods=['GET'])
##def lastInfo(teamID):
##    Matches=[]
##    for x in range(len(Squads)):
##        ##if str(Squads[x]['teamID'])
##        if str(Squads[x]['TeamID']) == teamID:

##            for vvvvy in range(len(Squads[x]['Squad'])):
##                jugador = {
##                    "Photo":Squads[x]['Squad'][y]['Photo'],
##                    "PlayerAge":Squads[x]['Squad'][y]['PlayerAge'] ,
##                    "PlayerID":Squads[x]['Squad'][y]['PlayerID'] ,
##                    "PlayerName":Squads[x]['Squad'][y]['PlayerName'] ,
##                    "PlayerNum":Squads[x]['Squad'][y]['PlayerNum'],
##                    "Position": Squads[x]['Squad'][y]['Position']
##                }
##                Jugadores.append(jugador)
            
##            return Jugadores
            
        

