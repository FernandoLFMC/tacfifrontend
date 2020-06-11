import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ActivoService } from '../../service/activo.service'
import { from } from 'rxjs';

@Component({
  selector: 'app-terrenos-list',
  templateUrl: './terrenos-list.component.html',
  styleUrls: ['./terrenos-list.component.css']
})
export class TerrenosListComponent implements OnInit {

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
  ngOnInit(): void {
    this.id=this.actirouter.snapshot.paramMap.get('id');
    console.log('res de terrenos list', this.id)
    this.activoservice.getidacti(this.id)
    .subscribe(
      res=>{console.log('res servicio idacti', res)
            this.activo=res
            },
      err=>console.log(err)
    )
    console.log('res activo',this.activo)
  }


}
