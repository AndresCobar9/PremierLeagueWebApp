import { Component,OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { jugadoresService } from './jugadores/jugadoresService';
import {PremierLeagueTeamsServices} from './premier-league-teams/PremierLeagueService'
import { AuthenticationService } from './authentication.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor(public auth: AuthenticationService){}
}
declare global {
  var teamID : string;
}