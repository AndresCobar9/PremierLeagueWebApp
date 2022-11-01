import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import{ HttpClient} from '@angular/common/http'
import { GlobalVariables } from "src/common/global-variables";
@Injectable()

export class jugadoresService
{
    private API_ServerSquad="http://127.0.0.1:3000/api/Squads/"
    constructor(public http:HttpClient){}
    public getSquad(teamid:string):Observable<any>{
        
        return this.http.get(this.API_ServerSquad + String(teamid))
    }
    
}