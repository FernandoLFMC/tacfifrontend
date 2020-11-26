import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { AuthService } from '../../service/auth.service'

import { MatTableDataSource} from '@angular/material/table'
//alertas de eliminar
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { CrearCuentaComponent } from '../crear-cuenta/crear-cuenta.component'
import {MatPaginator} from '@angular/material/paginator';
import {AfterViewInit, ViewChild} from '@angular/core';


@Component({
  selector: 'app-listar-csc',
  templateUrl: './listar-csc.component.html',
  styleUrls: ['./listar-csc.component.css']
})
export class ListarCscComponent implements OnInit {


  constructor(public authService: AuthService, private taskService: TaskService,
    public dialog:MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.taskService.listarcuenta()
    .subscribe(
      res => {
        this.dataSource.data = res
      },
      err=>{ 
        console.log(err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
  }
//funcionaes para cuenta
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id_cuenta','descripcion_cuenta','accion'];
  

  eliminar(cuenta){
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
        this.taskService.deletecuenta(cuenta)
        .subscribe(
          res =>{ 
            this.ngOnInit()
          console.log(res)
          Swal.fire('Eliminado', 'Se ha eliminado corectamente', 'success')
        },
          err =>{
            if(err.status == 500){
              Swal.fire('Error', 'No se puede eliminar, existe activos designados a esta cuenta', 'error')
            }else{
              Swal.fire('Error', 'No se pudo eliminar', 'error')
            }
          }
        )
      }
    })
  }
  editar(cuenta){
    this.openDialog(cuenta)
  }
  crear(){
    this.openDialog()
  }
  openDialog(cuenta?): void{
     const config ={
       data: cuenta
     };
    const dialogRef = this.dialog.open(CrearCuentaComponent, config);
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(`Dialog result ${res}`);
        this.ngOnInit()
      }
    )
  }

}