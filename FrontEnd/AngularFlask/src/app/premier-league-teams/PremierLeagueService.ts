import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import{ HttpClient} from '@angular/common/http'

@Injectable()

export class PremierLeagueTeamsServices
{
    private API_ServerTeams="http://127.0.0.1:3000/api/teams";
    constructor(public http:HttpClient){}
    public getTeams ():Observable<any>{
        return this.http.get(this.API_ServerTeams)
    }
    
}