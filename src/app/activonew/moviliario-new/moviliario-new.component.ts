import { Component, OnInit } from '@angular/core';

import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service'
import { Router } from '@angular/router'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-moviliario-new',
  templateUrl: './moviliario-new.component.html',
  styleUrls: ['./moviliario-new.component.css']
})
export class MoviliarioNewComponent implements OnInit {

  constructor(private activoservice:ActivoService,
    private taskservice: TaskService,
    private router: Router) { }


    codigo=[
      {num:1000, nombre:"Escritorio"},
      {num:2000, nombre:"Gavetero"},
      {num:3000, nombre:"Silla"},
      {num:4000, nombre:"Estante"},
      {num:5000, nombre:"Mesa para computadora"},
      {num:6000, nombre:"Muebles de seguridad"},
      {num:7000, nombre:"Cocina"},
      {num:8000, nombre:"Rampa"},
      {num:9000, nombre:"Mesa"},
      {num:10000, nombre:"Vitrina"},
      {num:11000, nombre:"Escalera"},
      {num:12000, nombre:"Sillon"},
      {num:13000, nombre:"Porta estante"},
      {num:14000, nombre:"Perchero"},
      {num:15000, nombre:"Soporte fijo Tv."},
      {num:16000, nombre:"Cajon"},
      {num:17000, nombre:"Tandem"},
      {num:18000, nombre:"Pizarra"},
      {num:19000, nombre:"Balanza"},
      {num:20000, nombre:"Ordenador de filas fisico"},
      {num:21000, nombre:"Testera"},
      {num:22000, nombre:"Pedestal"},
      {num:23000, nombre:"Caja fuerte"},
      {num:24000, nombre:"Garrafa"},
      {num:25000, nombre:"Libro"}
    ]

    model: {
      year: number,
      month: number,
      day:number
    };
  
    k="-"
    w="0"
    
    activo={
      id_cuenta: 173,
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
      this.fecha()
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
              res=>{console.log(res)},
              err=>{console.log(err)
                Swal.fire('Error', 'No se creo proveedor por el Nro. de NIT', 'error')}
            )
            this.adquisicion.nit=this.proveedor.nit
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
                  Swal.fire('Error', 'No se creo tipo de adquisicion', 'error')
                  this.delete(res)}
          )

        },
        err=>{
          console.log('error',err)
          Swal.fire('Error', 'Error, el codigo de tipo existe', 'error')
        }
      )
    }
  
    
  
  fecha(){
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
