import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { MatTableDataSource} from '@angular/material/table'
//alertas de eliminar
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { CrearFuncComponent } from '../crear-func/crear-func.component';

@Component({
  selector: 'app-listar-func',
  templateUrl: './listar-func.component.html',
  styleUrls: ['./listar-func.component.css']
})
export class ListarFuncComponent implements OnInit {

  constructor(private taskService:TaskService,
    public dialog:MatDialog) { }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id_funcionario','cod_seccion','id_coop','id_profesion','ci','nombre','ap_paterno','ap_materno','cargo','accion'];
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.taskService.listfuncionario()
    .subscribe(
      res => {
        this.dataSource.data= res
      },
      err => console.log(err)
    )
    
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
        this.taskService.deletefunci(element)
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

  editar(element){
    this.openDialog(element)
  }

  crear(){
    this.openDialog()
  }
   openDialog(func?): void{
     const config={
          data: func
     }
    const dialogRef = this.dialog.open(CrearFuncComponent, config);
    dialogRef.afterClosed().subscribe(
      res => {
        this.ngOnInit()
        console.log(`Dialog result ${res}`);
      }
    )
  }
}
