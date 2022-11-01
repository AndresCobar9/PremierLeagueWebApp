import { Component, OnInit } from '@angular/core';
import { PositionTableService } from './PositionTableService';


@Component({
  selector: 'app-position-table',
  templateUrl: './position-table.component.html',
  styleUrls: ['./position-table.component.css']
})
export class PositionTableComponent implements OnInit {

  Ranks:any;
  constructor(public RankPremier: PositionTableService){}
  ngOnInit(){
    this.RankPremier.getRank().subscribe(
      (t)=> {this.Ranks = t; console.log(t)},
      (k)=> { console.error(k)}
    ) 
  }

}
