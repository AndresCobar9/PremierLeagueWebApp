import { Component, OnInit } from '@angular/core';
import { identity } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
  
})
export class NavBarComponent implements OnInit {
 
  constructor(public log : AuthenticationService) { }
  
 

  ngOnInit(): void {
   


  }



  public logout(): void
  {
    this.log.logout()
  }

}
