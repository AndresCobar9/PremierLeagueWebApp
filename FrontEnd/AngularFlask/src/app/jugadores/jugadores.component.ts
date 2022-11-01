import { Component, OnInit } from '@angular/core';
import { jugadoresService } from './jugadoresService';
import { ActivatedRoute, NavigationEnd, Route, Router, RouterModule, Routes } from '@angular/router';
import { GlobalVariables } from 'src/common/global-variables';
@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.css']
})

export class JugadoresComponent implements OnInit {
  Players :any
  id:any
  filterteam ='';
  constructor(public Jugadores: jugadoresService, public router:Router, private route:ActivatedRoute) {}
  ngOnInit(){
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Tell the router that you didn't visited last link and so it wasn't previously loaded
        this.router.navigated = false;
        
      }
    });
    this.id = this.route.snapshot.paramMap.get("id");
    this.Players = []
    this.Jugadores.getSquad(this.id).subscribe(
      
      (r11)=> {this.Players = r11; console.log(r11)},
      (e11)=> { console.error(e11)}
    ) 
  }

  goToPage( ID:any){  
    this.router.navigate(['Estadisticas',{id:ID}])
    console.log(ID)
   
  }
  
}

