import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { AuthService } from '../../service/auth.service'

import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { CrearSeccionComponent } from '../crear-seccion/crear-seccion.component'
import {MatPaginator} from '@angular/material/paginator';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-seccion',
  templateUrl: './list-seccion.component.html',
  styleUrls: ['./list-seccion.component.css']
})
export class ListSeccionComponent implements AfterViewInit,OnInit {

  constructor(public authService: AuthService,
    private taskService: TaskService,
    public dialog:MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSources.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.taskService.getTask()
    .subscribe(
      res => {res.sort(function (a, b) {return a.cod_seccion.localeCompare(b.cod_seccion);});
        this.dataSources.data=res
      },
      err=>{ 
        console.log(err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
  }
  dataSources = new MatTableDataSource();
  displayedColumnss: string[] = ['cod_seccion','nombre_seccion','accion'];

  
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
            if(err.status == 500){
              Swal.fire('Error', 'No se puede eliminar, existe activos designados a esta sección', 'error')
            }else{
              Swal.fire('Error', 'No se pudo eliminar', 'error')
            }
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
