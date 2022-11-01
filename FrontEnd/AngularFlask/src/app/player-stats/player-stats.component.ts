import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PlayerStatsService } from './PlayerStatsService';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.css']
})
export class PlayerStatsComponent implements OnInit {

  constructor(private PlayerStat: PlayerStatsService, public router:Router, private route:ActivatedRoute,public log : AuthenticationService) { }
  Stat :any;
  Players :any
  id:any
  ngOnInit(): void {

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Tell the router that you didn't visited last link and so it wasn't previously loaded
        this.router.navigated = false;
        
      }
    });
    this.Stat={}
    this.id = this.route.snapshot.paramMap.get("id")
    this.PlayerStat.getStats(this.id).subscribe(
      (res: any) => { this.Stat = res},
      (error) => {
        
      }
    )
    
  }
  public logout(): void
  {
    this.log.logout()
  }



 
}
