import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ActivoService } from '../../service/activo.service';

import { TerrenosListComponent } from '../terrenos-list/terrenos-list.component'
import { VehiculosNewComponent } from '../../activonew/vehiculos-new/vehiculos-new.component'

import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';

import { from } from 'rxjs';

@Component({
  selector: 'app-activo-list',
  templateUrl: './activo-list.component.html',
  styleUrls: ['./activo-list.component.css']
})
export class ActivoListComponent implements OnInit {

  constructor(private activoService: ActivoService,
              private router:Router,private atciroute: ActivatedRoute,
              public dialog:MatDialog) { }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id_activo','id_cuenta','id_coop','cod_tipo','cod_seccion','id_funcionario',
  'nombre_tipo','unidad','estado_op_nop','detalles','mover','editar','eliminar'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.activoService.getactivo()
    .subscribe(
      res => {
        this.dataSource.data=res
        console.log('respons list activo',res)
      },
      err=>{
        console.log(err)
      }
    )
  }
  editar(activo){
    console.log('editar', activo)
  }
  eliminar(element){
    Swal.fire({
      title:'Estas Seguro',
      text: `No se podra revertir este proceso`,
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Eliminar!'
    }).then(result =>{
      if(result.value){
        console.log('delete', element);
        this.activoService.deleteactivo(element)
        .subscribe(
          res =>{ 
            this.ngOnInit()
            console.log(res)
            Swal.fire('Eliminado', 'Se ha eliminado corectamente', 'success')
          },
          err =>{
            console.log(err)
            Swal.fire('Error', 'No se pudo eliminar', 'error')
          }
        )
      }
    })
  }
  detalles(detail: number){
    console.log('detalles id',detail)
    this.router.navigate(['/lista-terrenos', detail])
  }
  mover(mover){
    console.log('mover id',mover)
  }

}