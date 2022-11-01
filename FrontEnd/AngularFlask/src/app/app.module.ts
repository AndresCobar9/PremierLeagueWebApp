import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { jugadoresService } from './jugadores/jugadoresService';
import { AppComponent } from './app.component';
import { PremierLeagueTeamsComponent } from './premier-league-teams/premier-league-teams.component';
import { PremierLeagueTeamsServices } from './premier-league-teams/PremierLeagueService';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PositionTableComponent } from './position-table/position-table.component';
import { PositionTableService } from './position-table/PositionTableService';
import { JugadoresComponent } from './jugadores/jugadores.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule} from '@angular/forms'
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { lineupService } from './lineup/lineupService';



import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { LineupComponent } from './lineup/lineup.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerModule } from './spinner/spinner.module';
import { HttpInterceptor } from '@angular/common/http';
import { SpinnerInterceptor } from './spinner/spinnerInterceptor';
import { RemovewhitespacePipe } from './custompipe/removewhitespace.pipe';
import { FilterPipe } from './custompipe/filter.pipe';
import { CardComponent } from './card/card.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import {PlayerStatsService} from './player-stats/PlayerStatsService';








const routes: Routes=
[
  { path:'', component: LoginComponent },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'Dashboard', component: PositionTableComponent , canActivate: [AuthGuardService]  },
  {path: 'Jugadores' , component: JugadoresComponent, canActivate: [AuthGuardService]},
  {path: 'Estadisticas' , component: PlayerStatsComponent, canActivate: [AuthGuardService]},
 
]


@NgModule({
  declarations: [
    AppComponent,
    PremierLeagueTeamsComponent,
    NavBarComponent,
    
    PositionTableComponent,
    JugadoresComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    LineupComponent,
    RemovewhitespacePipe,
    FilterPipe,
    CardComponent,
    PlayerStatsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    SpinnerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    PremierLeagueTeamsServices,
    PositionTableService,
    jugadoresService,
    AuthenticationService, AuthGuardService,
    lineupService,
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true},
    PlayerStatsService
    
  ],
  bootstrap: [AppComponent, JugadoresComponent]
})
export class AppModule { }
