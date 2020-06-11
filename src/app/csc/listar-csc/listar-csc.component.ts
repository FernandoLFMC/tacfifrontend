import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'

import { MatTableDataSource} from '@angular/material/table'
//alertas de eliminar
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { CrearCuentaComponent } from '../crear-cuenta/crear-cuenta.component'


@Component({
  selector: 'app-listar-csc',
  templateUrl: './listar-csc.component.html',
  styleUrls: ['./listar-csc.component.css']
})
export class ListarCscComponent implements OnInit {

  constructor(private taskService: TaskService,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.listCuenta()
  }
//funcionaes para cuenta
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id_cuenta','descripcion_cuenta','accion'];
  //operaciones de cuenta
  listCuenta(): void{
    this.taskService.listarcuenta()
    .subscribe(
      res => {
        this.dataSource.data = res
      },
      err=>console.log(err)
    )
  }

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
            console.log(err)
            Swal.fire('Error', 'No se pudo eliminar', 'error')
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
         //message: cuenta ? 'edit cuenta': 'new cuenta',
         //content: cuenta
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


    /*this.taskService.deletecuenta(cuenta)
    .subscribe(
      res=>{
        const index = this.cuentas.indexOf(cuenta)
        if(index>-1){
          this.cuentas.splice(index,1)
          this.snackBar.open("Tarea Borrada", null, {
            duration: 2000
          })
        }
      },
      err=>{
        console.log(err)
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.snackBar.open("No estas logeado", null, {
              duration: 2000
            })
            this.router.navigate(['/login'])
          }
        }
      }
    )*/