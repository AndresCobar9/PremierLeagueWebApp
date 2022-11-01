import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service'
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate
{

  constructor(private auth: AuthenticationService, private router: Router ) { }

  canActivate()
  {
    if(!this.auth.isLoggedIn())
    {
      
      this.router.navigateByUrl('/')
      
      return false
    }
    return true
  }
}