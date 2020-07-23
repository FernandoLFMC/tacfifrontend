import { Component, OnInit } from '@angular/core';

import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service'
import { Router, ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edificios-new',
  templateUrl: './edificios-new.component.html',
  styleUrls: ['./edificios-new.component.css']
})
export class EdificiosNewComponent implements OnInit {

  constructor(private activoservice:ActivoService,
    private taskservice: TaskService,
    private router: Router,
    private actirouter: ActivatedRoute) { }

    model: {
      year: number,
      month: number,
      day:number
    };
  
    k="-"
    w="0"
    
    activo={
      id_cuenta: 172,
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
    edificios={
      id_activo: 0,
      cod_catastro:"",
      superficie: "",
      matricula_ddrr:"",
      propietario:"",
      departamento: "",
      ciudad:"",
      direccion:""
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
  
    id='';
  ngOnInit(): void {
    if (this.actirouter.snapshot.paramMap.get('id')){
      this.id=this.actirouter.snapshot.paramMap.get('id');
      console.log('res id mover', this.id)
      this.activoservice.getidacti(this.id)
    .subscribe(
      res=>{this.activo=res
            this.adquisicion=res.adquisicion_activo
            this.edificios=res.edificios
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
      console.log('fecha',this.k)
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
          this.edificios.id_activo=res.id_activo
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
                    this.activoservice.createedificios(this.edificios)
                    .subscribe(
                      res=>{console.log('res edificio', res)
                      Swal.fire('Creado', 'Se creo corectamente', 'success')
                      this.router.navigate(['/listar-activo'])
                      },
                      err=>{console.log('err edificio', err)
                            Swal.fire('Error', 'No se creo Edificio', 'error')
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
                this.delete(res)
                Swal.fire('Error', 'No se creo proveedor por el Nro. de NIT', 'error')
              }
            )
            
          }else{
            if(this.model.day){
              this.fecha()
            }
            this.activoservice.createAdquiActi(this.adquisicion)
            .subscribe(
              res=>{console.log('res AdquiActi', res)
                this.activoservice.createedificios(this.edificios)
                .subscribe(
                  res=>{console.log('res edificio', res)
                  Swal.fire('Creado', 'Se creo corectamente', 'success')
                  this.router.navigate(['/listar-activo'])
                  },
                  err=>{console.log('err edificio', err)
                        Swal.fire('Error', 'No se creo Edificio', 'error')
                        this.delete(res)}
                )              
              },
              err=>{console.log('err AdquiActi', err)
                    this.model.day=this.model.day+1
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
            this.activoservice.putEdificios(this.edificios)
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
  
    codTipo=[]
    icon(){
      console.log("nombre tipo",this.activo.nombre_tipo)
      console.log("cod tipo",this.activo.cod_tipo)
      /*this.activoservice.getIdActivo()
      .subscribe(
        res=>{this.codTipo=res
              console.log(this.codTipo)},
        err=>console.log(err)
      )*/
      /*for (var i = 0; i < codTipo.length; i++){
        //if(codTipo.cod_tipo){}
        console.log(codTipo,length)
      }*/
  
    }

}
