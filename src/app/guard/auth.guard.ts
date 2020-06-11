import { Injectable } from '@angular/core';
import { CanActivate, Router /*ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree*/ } from '@angular/router';
//import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router){}
//verifica si esta logeado si no te manda al login
  canActivate(): boolean{
    if(this.authService.isLogged()){
      return true
    }else{
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
