import { Component, OnInit } from '@angular/core';
import { PremierLeagueTeamsServices } from './PremierLeagueService';
import { JugadoresComponent } from '../jugadores/jugadores.component';
import {Router} from '@angular/router'
import { GlobalVariables } from 'src/common/global-variables';


@Component({
  selector: 'app-premier-league-teams',
  templateUrl: './premier-league-teams.component.html',
  styleUrls: ['./premier-league-teams.component.css']
})
export class PremierLeagueTeamsComponent implements OnInit {

  Teams:any;
  constructor(public PremierTeams: PremierLeagueTeamsServices,private router:Router){}
  ngOnInit(){
    this.PremierTeams.getTeams().subscribe(
      (r)=> {this.Teams = r; console.log(r)},
      (e)=> { console.error(e)}
    ) 
  }

  goToPage( ID:any){  
    this.router.navigate(['Jugadores',{id:ID}])
    console.log(ID)
    // GlobalVariables.teamID = String(ID);
    // console.log(String(GlobalVariables.teamID))
  }

}

