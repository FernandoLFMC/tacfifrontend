import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-computacion-list',
  templateUrl: './computacion-list.component.html',
  styleUrls: ['./computacion-list.component.css']
})
export class ComputacionListComponent implements OnInit {

  constructor(private router: Router,
    private actirouter: ActivatedRoute,
    private activoservice: ActivoService,
    private taskservice : TaskService,
    public dialog: MatDialogRef<ComputacionListComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

    id='';
    activo={
      id_cuenta: 0,
      id_coop: "",
      cod_tipo: "",
      cod_seccion: "",
      id_funcionario: "",
      nombre_tipo: "",
      descripcion: "",
      unidad: "",
      estado_op_nop: "Operativo",
      observacion: "",
      vida_util:"",
      sujeto_depreciacion:"",
      imagen:""

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
    
    equipcompu={
      id_activo: 0,
      marca:"",
      nro_serial:"",
      color:"",
      tipo:"",
      industria:""
    }
    terrenos= {
      cod_catastro:"",
      superficie: "",
      matricula_ddrr:"",
      propietario:"",
      departamento: "",
      ciudad:"",
      direccion:""
    }
    edificios= {
      cod_catastro:"",
      superficie: "",
      matricula_ddrr:"",
      propietario:"",
      departamento: "",
      ciudad:"",
      direccion:""
    }
    mobiliarioenseres= {
      id_activo: 0,
      material:"",
      color: ""
    }
    equipinstall={
      id_activo: 0,
      marca:"",
      nro_serial:"",
      color:"",
      tipo:"",
      industria:"",
      modelo:""
    }
    vehiculos= {
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

    nombres={
      nombre:"",
      ap_paterno:"",
      ap_materno:""
    }

    proveedors={
      nit:0,
      direccion:"",
      nombre_tienda:"",
      telefono:0
    }
    
    ngOnInit(): void {
      //this.id=this.actirouter.snapshot.paramMap.get('id');
      this.activoservice.getidacti(this.data)
      .subscribe(
        res=>{console.log('res servicio idacti', res)
              this.activo=res
              this.adquisicion=res.adquisicion_activo
              if(res.id_cuenta==171){
                this.terrenos=res.terrenos
              }else{
                if(res.id_cuenta==172){
                this.edificios=res.edificios
                }else{
                  if(res.id_cuenta==173){
                    this.mobiliarioenseres=res.mobiliarioenseres
                  }else{
                    if(res.id_cuenta==174){
                      this.equipinstall=res.equiposinstalacion
                    }else{
                      if(res.id_cuenta==175){
                        this.equipcompu=res.equiposcomputacion
                      }else{
                        if(res.id_cuenta==176){
                          this.vehiculos=res.vehiculos
                        }
                      }
                    }
                  }
                }
              }
              this.taskservice.getidfunci(res.id_funcionario)
              .subscribe(
                res=>{console.log('res id func', res)
                  this.nombres=res
                },
                err=>console.log(err)
              )
              this.activoservice.getidproveedor(res.adquisicion_activo.nit)
              .subscribe(
                res=>{console.log('res id provee',res)
                  this.proveedors=res
                },
                err=>console.log('err id prov', err)
              )
              },
        err=>console.log(err)
      )
    }
} 

