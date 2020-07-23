import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ActivoService } from '../../service/activo.service'

@Component({
  selector: 'app-computacion-list',
  templateUrl: './computacion-list.component.html',
  styleUrls: ['./computacion-list.component.css']
})
export class ComputacionListComponent implements OnInit {

  constructor(private router: Router,
    private actirouter: ActivatedRoute,
    private activoservice: ActivoService) { }

    id='';
    activo={
      id_cuenta: "",
      id_coop: "",
      cod_tipo: "",
      cod_seccion: "",
      id_funcionario: "",
      nombre_tipo: "",
      descripcion: "",
      unidad: "",
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
    
    equipcompu={
      id_activo: 0,
      marca:"",
      nro_serial:"",
      color:"",
      tipo:"",
      industria:""
    }
  
    ngOnInit(): void {
      this.id=this.actirouter.snapshot.paramMap.get('id');
      this.activoservice.getidacti(this.id)
      .subscribe(
        res=>{console.log('res servicio idacti', res)
              this.activo=res
              this.adquisicion=res.adquisicion_activo
              this.equipcompu=res.equiposcomputacion
              },
        err=>console.log(err)
      )
    }
}
