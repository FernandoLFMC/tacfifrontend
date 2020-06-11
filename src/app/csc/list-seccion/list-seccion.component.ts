import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'

import { MatTableDataSource} from '@angular/material/table'
//alertas de eliminar
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { CrearSeccionComponent } from '../crear-seccion/crear-seccion.component'

@Component({
  selector: 'app-list-seccion',
  templateUrl: './list-seccion.component.html',
  styleUrls: ['./list-seccion.component.css']
})
export class ListSeccionComponent implements OnInit {

  constructor(private taskService: TaskService,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.listSeccion()
  }
  dataSources = [];
  displayedColumnss: string[] = ['cod_seccion','nombre_seccion','accion'];

  listSeccion():void{
    this.taskService.getTask()
    .subscribe(
      res => {
        this.dataSources=res
      },
      err=> console.log(err)
    )
  }
  eliminarS(seccion){
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
        this.taskService.deleteTask(seccion)
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
  editarS(seccion){
    this.openDialogS(seccion)
  }
  crearS(){
    this.openDialogS()
  }
  openDialogS(seccion?): void{
    const config ={
      data: seccion
    };
    const dialogRef = this.dialog.open(CrearSeccionComponent, config);
    dialogRef.afterClosed().subscribe(
      res => {
        this.ngOnInit()
        console.log(`Dialog result ${res}`);
      }
      
    )
  }
}
