import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service'
import { Router } from '@angular/router'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-otros-new',
  templateUrl: './otros-new.component.html',
  styleUrls: ['./otros-new.component.css']
})
export class OtrosNewComponent implements OnInit {

  constructor(private actirouter: ActivatedRoute,
    private activoservice:ActivoService,
    private taskservice: TaskService,
    private router: Router) { }

  id_cuent=""

  model: {
    year: number,
    month: number,
    day:number
  };

  k="-"
  w="0"
  
  activo={
    id_cuenta:"",
    id_coop: "",
    cod_tipo: "",
    cod_seccion: "",
    id_funcionario: "",
    nombre_tipo: "",
    descripcion: "",
    unidad: "Pza. 1",
    estado_op_nop: "Operativo",
    observacion: ""
  }
  adquisicion ={
    id_activo: 0,
    id_adquisicion: "",
    nit: "",//1020304050,
    fecha_adquisicion: "",//2020-03-17
    comprobante_contable: "",
    nro_factura:"",
    costo_adquisicion: ""
  }
  mobiliarioenseres={
    id_activo: 0,
    material:"",
    color: ""
  }

  proveedor={
    nit:"",
    nombre_tienda:"",
    direccion:"",
    telefono:""
  }

  seccion:[]
  coop:[]
  funcionario:[]
  adqui:[]
  prov:[]

  ngOnInit(): void {
    this.activo.id_cuenta=this.actirouter.snapshot.paramMap.get('id')
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
    this.taskservice.listarcoop()
    .subscribe(
      res=>this.coop=res,
      err=>console.log(err)
    )
    this.taskservice.listadqui()
    .subscribe(
      res=>this.adqui=res,
      err=>console.log(err)
    )
    this.activoservice.getproveedor()
    .subscribe(
      res=>this.prov=res,
      err=>console.log(err)
    )
  }
  crear(){
    
    //this.activo.id_activo=this.activo.id_cuenta+ this.activo.cod_tipo
    //this.terrenoss.id_activo=this.activo.id_cuenta+ this.activo.cod_tipo
    //this.adquisicion.id_activo=this.activo.id_cuenta + this.activo.cod_tipo
    //this.activo.adquisicion_activo=this.adquisicion
    //this.activo.terrenos=this.terrenoss
    console.log('lo que manda',this.activo)
    this.activoservice.createactivo(this.activo)
    .subscribe(
      res=>{
        console.log('respuesta id act',res.id_activo)
        this.adquisicion.id_activo=res.id_activo
        this.mobiliarioenseres.id_activo=res.id_activo
        if(!this.adquisicion.nit){
          this.activoservice.createproveedor(this.proveedor)
          .subscribe(
            res=>{console.log(res)
              this.adquisicion.nit=this.proveedor.nit
              if(this.model.day){
                this.fecha()
              }
              this.activoservice.createAdquiActi(this.adquisicion)
              .subscribe(
                res=>{console.log('res AdquiActi', res)
                Swal.fire('Creado', 'Se creo corectamente', 'success')
                this.router.navigate(['/listar-activo'])              
                },
                err=>{console.log('err AdquiActi', err)
                      this.model.day=this.model.day-1
                      Swal.fire('Error', 'No se creo tipo de adquisicion', 'error')
                      this.delete(res)}
              )
            },
            err=>{console.log(err)
              Swal.fire('Error', 'No se creo proveedor por el Nro. de NIT', 'error')
              this.delete(res)
            }
          )
          
        }else{
          if(this.model.day){
            this.fecha()
          }
          this.activoservice.createAdquiActi(this.adquisicion)
          .subscribe(
            res=>{console.log('res AdquiActi', res)
              this.activoservice.createmobiliario(this.mobiliarioenseres)
              .subscribe(
                res=>{console.log('res Mobiliario', res)
                Swal.fire('Creado', 'Se creo corectamente', 'success')
                this.router.navigate(['/listar-activo'])
                },
                err=>{console.log('err mobiliario', err)
                      Swal.fire('Error', 'No se creo Mobiliario', 'error')
                      this.delete(res)}
              )              
            },
            err=>{console.log('err AdquiActi', err)
                  this.model.day=this.model.day-1
                  Swal.fire('Error', 'No se creo tipo de adquisicion', 'error')
                  this.delete(res)}
          )
        }

      },
      err=>{
        console.log('error',err)
        Swal.fire('Error', 'Error, el codigo de tipo existe', 'error')
      }
    )
  }

  

  fecha(){
    this.model.day=this.model.day+1
    if(this.model.month < 10 && this.model.day >9){
      this.adquisicion.fecha_adquisicion=this.model.year+this.k+this.w+this.model.month+this.k+this.model.day}
      else{if(this.model.month < 10 && this.model.day <10){
        this.adquisicion.fecha_adquisicion=this.model.year+this.k+this.w+this.model.month+this.k+this.w+this.model.day}
        else{if(this.model.month > 9 && this.model.day < 10){
          this.adquisicion.fecha_adquisicion=this.model.year+this.k+this.model.month+this.k+this.w+this.model.day}
          else{this.adquisicion.fecha_adquisicion=this.model.year+this.k+this.model.month+this.k+this.model.day}
    }}
  }

  delete(res){
    this.activoservice.deleteactivo(res)
    .subscribe(
      res=>console.log(res),
      err=>console.log(err)
    )
  }

}
