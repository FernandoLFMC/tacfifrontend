import { Component, OnInit } from '@angular/core';

import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service'
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculos-new',
  templateUrl: './vehiculos-new.component.html',
  styleUrls: ['./vehiculos-new.component.css']
})
export class VehiculosNewComponent implements OnInit {

  constructor(private activoservice:ActivoService,
    private taskservice: TaskService,
    private router: Router,
    private actirouter: ActivatedRoute) { }

    codigo=[
      {num:1000, nombre:"Jeep"}
    ]
  
    model: {
      year: number,
      month: number,
      day:number
    };
    
    k="-"
    w="0"
      
    activo={
      id_cuenta: 176,
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
    vehiculos={
      id_activo: 0,
      ruat:"",
      nro_placa:"",
      marca:"",
      tipo:"",
      color:"",
      modelo:"",
      nro_chasis:"",
      nro_motor:"",
      procedencia:"",
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
    
    id=''
    ngOnInit(): void {
      if (this.actirouter.snapshot.paramMap.get('id')){
        this.id=this.actirouter.snapshot.paramMap.get('id');
        console.log('res id mover', this.id)
        this.activoservice.getidacti(this.id)
      .subscribe(
        res=>{this.activo=res
              this.adquisicion=res.adquisicion_activo
              this.vehiculos=res.vehiculos
              this.model=res.adquisicion_activo.fecha_adquisicion
              console.log('res acti',res)
              console.log('res acti',this.model)},
        err=>console.log(err)
      )
      }

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
      console.log('lo que manda',this.activo)
      this.activoservice.createactivo(this.activo)
      .subscribe(
        res=>{
          console.log('respuesta',res)
          this.adquisicion.id_activo=res.id_activo
          this.vehiculos.id_activo=res.id_activo
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
                    this.activoservice.createvehiculos(this.vehiculos)
                    .subscribe(
                      res=>{console.log('res vehiculos', res)
                      Swal.fire('Creado', 'Se creo corectamente', 'success')
                      this.router.navigate(['/listar-activo'])
                      },
                      err=>{console.log('err Instalacion', err)
                            Swal.fire('Error', 'No se creo datos del Vehiculo', 'error')
                            this.delete(res)}
                    )              
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
                this.activoservice.createvehiculos(this.vehiculos)
                .subscribe(
                  res=>{console.log('res vehiculos', res)
                  Swal.fire('Creado', 'Se creo corectamente', 'success')
                  this.router.navigate(['/listar-activo'])
                  },
                  err=>{console.log('err Instalacion', err)
                        Swal.fire('Error', 'No se creo datos del Vehiculo', 'error')
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
    
    edit(){
      this.activoservice.putactivo(this.activo)
      .subscribe(
        res=>{console.log('res put acti',res)
          this.activoservice.putAdquiActi(this.adquisicion)
          .subscribe(
            res=>{console.log('resput adquiacti', res)
            this.activoservice.putVehiculos(this.vehiculos)
            .subscribe(
              res=>{console.log('resput adquiacti', res)
              Swal.fire('Editado', 'Se Edito corectamente', 'success')
              this.router.navigate(['/listar-activo'])  
            },
              err=>{console.log('err put adquiacti', err)
              Swal.fire('Error', 'No se a Editado ', 'error')}
            )
          },
            err=>{console.log('err put adquiacti', err)
          Swal.fire('Error', 'No se a Editado ', 'error')}
          )
      },
        err=>{console.log('error put acti', err)
        Swal.fire('Error', 'No se a Editado ', 'error')}
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
