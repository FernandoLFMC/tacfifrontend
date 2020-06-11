import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otros-new',
  templateUrl: './otros-new.component.html',
  styleUrls: ['./otros-new.component.css']
})
export class OtrosNewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  activo={
    id_activo: "",
    id_cuenta: 171,
    id_coop: "",
    cod_tipo: 1000,
    cod_seccion: "",
    id_funcionario: "",
    nombre_tipo: "terreno",
    descripcion: "",
    unidad: "",
    estado_op_nop: "operativo",
    observacion: "",
    adquisicion_activo:{},
    terrenos: {}
  }
  adquisicion ={
    id_activo: "",
    id_adquisicion: "",
    nit: "",
    fecha_adquisicion: "",//2020-03-17
    comprobante_contable: "",
    costo_adquisicion: ""
  }
  terrenoss={
    id_activo: "",
    cod_catastro:"",
    superficie: "",
    matricula_ddrr:"",
    propietario:"",
    departamento: "",
    ciudad:"",
    direccion:""
  }

  crear(){
    this.activo.adquisicion_activo=this.adquisicion
    this.activo.terrenos=this.terrenoss
    console.log(this.activo)
    console.log(this.activo.adquisicion_activo)
    console.log(this.activo.terrenos)
  }
}
