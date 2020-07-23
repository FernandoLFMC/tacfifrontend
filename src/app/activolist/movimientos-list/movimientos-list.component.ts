import { Component, OnInit } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ActivoService } from '../../service/activo.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimientos-list',
  templateUrl: './movimientos-list.component.html',
  styleUrls: ['./movimientos-list.component.css']
})
export class MovimientosListComponent implements OnInit {

  constructor(private activoService: ActivoService) { }

  dataSource = new MatTableDataSource();

  infoactivo={
    id_activo:"",
    funcionario_anterior:"",
    seccion_anterior:"",
    fecha_movimiento:"",
    motivo:"",
    funcionario_actual:"",
    seccion_actual:"",
  }

  displayedColumns: string[] = ['id_info','id_activo','funcionario_anterior','seccion_anterior',
  'fecha_movimiento','motivo','funcionario_actual','seccion_actual','editar','eliminar'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.activoService.getinfo_acti()
    .subscribe(
      res => {
        this.dataSource.data=res
        console.log('res info_activo',res)
      },
      err=>{
        console.log('err info_acti',err)
      }
    )
  }

  editar(edit){
    console.log('edit info_acti', edit)
  }

  eliminar(eliminar){
    console.log('elminar info_acti', eliminar)
  }


}
