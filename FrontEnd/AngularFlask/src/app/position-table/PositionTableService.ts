import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import{ HttpClient} from '@angular/common/http'

@Injectable()

export class PositionTableService
{
    private API_ServerRank="http://127.0.0.1:3000/api/PosTable";
    constructor(public http:HttpClient){}
    public getRank():Observable<any>{
        return this.http.get(this.API_ServerRank)
    }
    
}