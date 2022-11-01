import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ReturnStatement } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { spinnerService } from "./spinnerService";

@Injectable()


export class SpinnerInterceptor implements HttpInterceptor{
    constructor(private spinnerSvc:spinnerService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.spinnerSvc.show();
        return next.handle(req).pipe(
            finalize(() => this.spinnerSvc.hide())
        );
    }
}