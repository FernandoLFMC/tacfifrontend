import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }
  terrenosnew(){
    this.router.navigate(['/terrenos-new'])
  }
  edificiosnew(){
    this.router.navigate(['/edificios-new'])
  }
  moviliarionew(){
    this.router.navigate(['/moviliario-new'])
  }
  instalacionnew(){
    this.router.navigate(['/instalacion-new'])
  }
  computacionnew(){
    this.router.navigate(['/computacion-new'])
  }
  vehiculosnew(){
    this.router.navigate(['/vehiculos-new'])
  }
  otrosnew(){
    this.router.navigate(['/otros-new'])
  }
  seccionlist(){
    this.router.navigate(['/list-seccion'])
  }
  cooplist(){
    this.router.navigate(['/list-coop'])
  }
  cuentalist(){
    this.router.navigate(['/listarcsc'])
  }
  adquilist(){
    this.router.navigate(['/listar-adqui'])
  }
}
