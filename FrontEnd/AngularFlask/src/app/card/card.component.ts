import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() PlayerName: any;
  @Input() PlayerPosition:any;
  @Input() PlayerLogo:any;
  @Input() PlayerNum:any;
  @Input() PlayerAge:any;
  @Input() PlayerID:any;


  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goToPage( ID:any){  
    this.router.navigate(['Estadisticas',{id:ID}])
    console.log(ID)
    // GlobalVariables.teamID = String(ID);
    // console.log(String(GlobalVariables.teamID))
  }
}
