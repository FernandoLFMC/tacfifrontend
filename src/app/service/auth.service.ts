import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpURL = "http://localhost:8080/api/auth/signup"
  private loginURL = "http://localhost:8080/api/auth/signin"
  private userURL = "http://localhost:8080/api/auth/listuser"
  private adminrol = "http://localhost:8080/api/v1/admin"
  private userrol = "http://localhost:8080/api/v1/user"
  private pmrol = "http://localhost:8080/api/v1/pm"

  constructor(private http: HttpClient,
    private router: Router) { }

  signUpUser (user){
    return this.http.post<any>(this.signUpURL,user)
  }

  loginUser(user){
    return this.http.post<any>(this.loginURL, user)
  }
  
/*verificacion si existe un token o esta logeado true----false*/
  isLogged(){
    return !!localStorage.getItem('token')
  }

  //extraer el toquen para mandar en las peticiones la authorization
  getToken(){
    return localStorage.getItem('token')
  }

  getRol(){
    return localStorage.getItem('rol')
  }

  logoutUser(){
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    this.router.navigate(['/login'])
  }

  roladmin(){
    return this.http.get<any>(this.adminrol)
  }
  roluser(){
    return this.http.get<any>(this.userrol)
  }
  rolpm(){
    return this.http.get<any>(this.pmrol)
  }

  //listar usuarios 
  listuser(){
    return this.http.get<any>(this.userURL)
  }
  deleteuser(delet){
    const id=delet.id
    const url= `${this.userURL}/${id}`
    return this.http.delete<any>(url)
  }
}
