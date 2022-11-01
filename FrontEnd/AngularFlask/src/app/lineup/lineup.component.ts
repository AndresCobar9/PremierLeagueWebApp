import { Component, OnInit } from '@angular/core';
import { lineupService } from './lineupService'

import { ActivatedRoute, NavigationEnd, Route, Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit {
 
  TeamI:any
  id:any
  constructor(public TeamsInfo: lineupService,public router:Router, private route:ActivatedRoute) { }
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get("id");
    this.TeamsInfo.getTeamI(this.id).subscribe(
      (rt)=> {this.TeamI = rt; console.log(rt)},
      (kl)=> {console.error(kl)}
    ) 
  }

}
