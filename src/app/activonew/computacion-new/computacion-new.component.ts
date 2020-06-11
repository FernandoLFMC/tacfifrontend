import { Component, OnInit } from '@angular/core';

import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service'
import { Router } from '@angular/router'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-computacion-new',
  templateUrl: './computacion-new.component.html',
  styleUrls: ['./computacion-new.component.css']
})
export class ComputacionNewComponent implements OnInit {

  constructor(private activoservice:ActivoService,
    private taskservice: TaskService,
    private router: Router) { }

  codigo=[
    {num:1000, nombre:"Monitor"},
    {num:2000, nombre:"Case"},
    {num:3000, nombre:"Hub o Switch"},
    {num:4000, nombre:"Impresora"},
    {num:5000, nombre:"UPS"},
    {num:6000, nombre:"WepCam"},
    {num:7000, nombre:"Estabilizador"},
    {num:8000, nombre:"Lector de Huellas"},
    {num:9000, nombre:"Disco Duro"},
    {num:10000, nombre:"Proyector"}
  ]

  model: {
    year: number,
    month: number,
    day:number
  };
  
  k="-"
  w="0"
    
  activo={
    id_cuenta: 175,
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
  equipcompu={
    id_activo: 0,
    marca:"",
    nro_serial:"",
    color:"",
    tipo:"",
    industria:""
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
        console.log('respuesta id act',res)
        this.adquisicion.id_activo=res.id_activo
        this.equipcompu.id_activo=res.id_activo
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
            this.activoservice.createEquiCompu(this.equipcompu)
            .subscribe(
              res=>{console.log('res computacion', res)
              Swal.fire('Creado', 'Se creo corectamente', 'success')
              this.router.navigate(['/listar-activo'])
              },
              err=>{console.log('err Instalacion', err)
                    Swal.fire('Error', 'No se creo Equipo de computacion', 'error')
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

