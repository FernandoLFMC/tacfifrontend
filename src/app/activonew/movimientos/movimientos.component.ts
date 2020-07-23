import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service'

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  constructor(private router: Router,
              private actirouter: ActivatedRoute,
              private activoservice: ActivoService,
              private taskservice: TaskService) { }

  model: {
    year: number,
    month: number,
    day:number
  };
    
  k="-"
  w="0"
  

  infoactivo={
    id_activo:"",
    funcionario_anterior:"",
    seccion_anterior:"",
    fecha_movimiento:"",
    motivo:"",
    funcionario_actual:"",
    seccion_actual:""
  }

  info_acti={
    id_activo:"",
    cod_seccion: "",
    id_funcionario: ""
  }

  id_cuenta: ""
  cod_tipo: ""

  seccion:[]
  funcionario:[]
  id_info_acti=""
  id=""
  ngOnInit(): void {
    this.id=this.actirouter.snapshot.paramMap.get('id');
    //console.log('res de terrenos list', this.id)
    this.activoservice.getidacti(this.id)
    .subscribe(
      res=>{this.id_cuenta=res.id_cuenta
            this.info_acti.id_activo=res.id_activo
            this.cod_tipo=res.cod_tipo
            this.infoactivo.id_activo=res.id_activo
            this.infoactivo.funcionario_anterior=res.id_funcionario
            this.infoactivo.seccion_anterior=res.cod_seccion
            },
      err=>console.log(err)
    )
    this.taskservice.getTask()
    .subscribe(
      res=>this.seccion=res,
        err=> console.log(err)
    )
    this.taskservice.listfuncionario()
    .subscribe(
      res=>this.funcionario=res,
      err=>console.log(err)
    )
  }

  crear(){
    if(this.model.day){
      this.fecha()
    }
    this.infoactivo.funcionario_actual=this.info_acti.id_funcionario
    this.infoactivo.seccion_actual=this.info_acti.cod_seccion
    /*console.log('res crear', this.infoactivo)
    console.log('res crearrr', this.info_acti)*/
    this.activoservice.createinfo_acti(this.infoactivo)
    .subscribe(
      res=>{
        console.log('res crear', res)
        this.id_info_acti=res.id_info
        this.activoservice.updateinfoacti(this.info_acti)
        .subscribe(
          res=>{console.log('res crearrr', res)},
          err=>{console.log('error crearrr',err)
                this.activoservice.deleteinfo_acti(this.id_info_acti)
                .subscribe(
                  res=>console.log('se elimino',res),
                  err=>console.log('no se elimino',err)
                )}
        )
      },
      err=>{console.log('error service', err)
      this.model.day=this.model.day-1}
    )
  }


  fecha(){
    this.model.day=this.model.day+1
    if(this.model.month < 10 && this.model.day >9){
      this.infoactivo.fecha_movimiento=this.model.year+this.k+this.w+this.model.month+this.k+this.model.day}
      else{if(this.model.month < 10 && this.model.day <10){
        this.infoactivo.fecha_movimiento=this.model.year+this.k+this.w+this.model.month+this.k+this.w+this.model.day}
        else{if(this.model.month > 9 && this.model.day < 10){
          this.infoactivo.fecha_movimiento=this.model.year+this.k+this.model.month+this.k+this.w+this.model.day}
          else{this.infoactivo.fecha_movimiento=this.model.year+this.k+this.model.month+this.k+this.model.day}
    }}
  }
}