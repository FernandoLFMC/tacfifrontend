import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'
import { Router, ActivatedRoute } from '@angular/router'
import { TaskService } from '../service/task.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService,
    private router:Router,private atciroute: ActivatedRoute,
    private taskservice:TaskService) { }

    cuenta:[]

  ngOnInit(): void {
    this.taskservice.listarcuenta()
    .subscribe(
      res=>this.cuenta=res,
      err=>console.log('err serv cuenta', err)
    )
    
  }

  listaactivo(){
    this.router.navigate(['/listar-activo'])
  }
  listamovi(){
    this.router.navigate(['/list-movimiento'])
  }
  reportes(){
    this.router.navigate(['/reportes'])
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
  otrosnew(id:number){
    this.router.navigate(['/otros-new',id])
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
  tipocuenta(){
    this.router.navigate(['/listar-tipocuenta'])
  }
  adquilist(){
    this.router.navigate(['/listar-adqui'])
  }
  createuser(){
    this.router.navigate(['/signup'])
  }
  listuser(){
    this.router.navigate(['/list-user'])
  }
}
