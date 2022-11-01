import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  credentials: TokenPayload=
  {
    id:0,
    first_name:'',
    last_name:'',
    email:'',
    password:''
  }

  login()
  {
    this.auth.login(this.credentials).subscribe(
      () => {

        this.router.navigateByUrl('/Dashboard')
     
      },
      err => {
        console.log("aca")
        console.error(err)
        Swal.fire({
          title: 'Login Incorrecto',
          text: "Haz ingresado los campos incorrectamente",
          icon: 'error',
          confirmButtonText: 'Regresar'
        })
      }
    )
  }
  
}
