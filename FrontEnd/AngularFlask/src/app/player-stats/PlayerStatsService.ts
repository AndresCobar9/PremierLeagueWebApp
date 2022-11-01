import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import{ HttpClient} from '@angular/common/http'
import { GlobalVariables } from "src/common/global-variables";
@Injectable()

export class PlayerStatsService
{
    private Stats="http://127.0.0.1:3000/api/Player/"
    constructor(public http:HttpClient){}

    public getStats(teamid:string):Observable<any>{
        
        return this.http.get(this.Stats+ String(teamid) )
    }
    
}