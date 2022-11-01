import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import{ HttpClient} from '@angular/common/http'
import { GlobalVariables } from "src/common/global-variables";
@Injectable()

export class lineupService
{
    private API_ServerTeamI="http://127.0.0.1:3000/api/Team/"  
    constructor(public http:HttpClient){}
    public getTeamI(teamid:string):Observable<any>{
        return this.http.get(this.API_ServerTeamI+ String(teamid))
    }
    
}