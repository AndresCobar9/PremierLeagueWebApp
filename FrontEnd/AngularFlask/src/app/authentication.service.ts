import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

export interface UserDetails
{
  _id: number
  first_name: string
  last_name: string
  email: string
  password: string
  exp: number
  iat: number
}

interface TokenResponse
{
  token: string
}

export interface TokenPayload
{
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) { }

  private token!: string;

  private saveToken(token: string): void
  {
    localStorage.setItem('usertoken', token)
    this.token=token
  }

  private getToken(): string
  {
    
    if(!this.token)
    {
      this.token==localStorage.getItem('usertoken')
    }
   
    return this.token
  }

  public getUserDetails(): UserDetails
  {
    const token=this.getToken()
    
    let payload
    var x
    if(token)
    {
      payload=token.split('.')[1]
      payload=window.atob(payload)
      x = JSON.parse(payload)
      
      return JSON.parse(payload)

      
    }
    else
    {
        return null as any
        
    }
  }

  public getUserInfo(busqueda:string): UserDetails
  {

    const token=this.getToken()
    
    let payload
    var x
    if(token)
    {
      payload=token.split('.')[1]
      payload=window.atob(payload)
      x = JSON.parse(payload)
     x['sub'][busqueda]
      return x['sub'][busqueda]
    }
    else
    {
        return null as any
        
    }
  }
  

  public isLoggedIn(): boolean
  {
    const user=this.getUserDetails()
    
    if(user)
    {
      
      return user.exp > Date.now()/1000
    }
    else
    {
      return false
    }
  }
  

  public register(user: TokenPayload): Observable<any>
  {
    const base=this.http.post<TokenResponse>(`http://localhost:3000/user/register`, user)
    const request=base.pipe(
      map((data: TokenResponse) => {
        if(data.token)
        {
          this.saveToken(data.token)
        }
        console.log(data)

        var x = JSON.stringify(data)
        console.log("Este es x: " + x)
        if ( x == '{"result":"Password Length"}')
        {
          Swal.fire({
            title: 'Error en el registro',
            text: "La contraseña debe ser mayor a 5 caracteres",
            icon: 'error',
            confirmButtonText: 'Reintentar'
        })
      }

        if ( x == '{"result":"Invalid Email"}')
        {
          Swal.fire({
            title: 'Error en el registro',
            text: "El Email ingresado es invalido",
            icon: 'error',
            confirmButtonText: 'Reintentar'
        })
        
      }

      if ( x == '{"result":"user already exists"}')
        {
          Swal.fire({
            title: 'Error en el registro',
            text: "El Email ingresado ya existe",
            icon: 'error',
            confirmButtonText: 'Reintentar'
        })
        
      }

      if ( x == '{"result":"The Names are invalid"}')
      {
        Swal.fire({
          title: 'Error en el Registro',
          text: "Los nombres no deben contener numeros",
          icon: 'error',
          confirmButtonText: 'Reintentar'
      })
      
    }

      if ( x == '{"result":"user successfully added"}')
        {
          Swal.fire({
            title: 'El registro es valido',
            text: "El Email ingresado es invalido",
            icon: 'success',
            confirmButtonText: 'Reintentar'
        }).then((result)=> {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/login')
        }
        })
        
      }
      
    
      console.log(data)
        return data
        
      })
    )
    
    return request
  }

/*
  public register(user: TokenPayload): Observable<any>
  {
    console.log(this.http.post(`http://localhost:3000/user/register`, user))
    return this.http.post(`http://localhost:3000/user/register`, user)
  }
  */
  public login(user: TokenPayload): Observable<any>
  {
    const base=this.http.post<TokenResponse>(`http://localhost:3000/user/login`, user)
    const request=base.pipe(
    map((data: TokenResponse) => {
        if(data.token)
        {
          this.saveToken(data.token)
        }
        console.log(data)
        var x = JSON.stringify(data)
        console.log("Este es x: " + x)
        if ( x == '{"error":"Invalid username or password"}')
        {
          console.log("ENTRO MI LOCO")
          Swal.fire({
            title: 'Login Invalido',
            text: "Haz ingresado la contraseña incorrecta",
            icon: 'error',
            confirmButtonText: 'Reintentar'})
        }
        

        return data
      })
    )
    console.log("Request: " + request)
    return request
    
  }

  public logout(): void
  {
    Swal.fire({
      title: 'Se ha cerrado la sesion',
      text: "Se ha cerrado de la sesion actual",
      icon: 'error',
      confirmButtonText: 'OK!'
     
  })
    this.token=''
    
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}