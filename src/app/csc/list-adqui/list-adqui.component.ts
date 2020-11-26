import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { AuthService } from '../../service/auth.service'

import { MatTableDataSource} from '@angular/material/table'
//alertas de eliminar
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { CrearAdquiComponent} from '../crear-adqui/crear-adqui.component'

@Component({
  selector: 'app-list-adqui',
  templateUrl: './list-adqui.component.html',
  styleUrls: ['./list-adqui.component.css']
})
export class ListAdquiComponent implements OnInit {

  constructor(private taskService: TaskService,
    public authService: AuthService,
    public dialog:MatDialog) { }

    dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['id_adquisicion','porcentaje','nombre_tipo_adq','accion'];

  ngOnInit(): void {
    this.taskService.listadqui()
    .subscribe(
      res => {
        this.dataSource.data=res
      },
      err => { 
        console.log('err',err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
  }

  crear(){
    this.openDialog()
  }
  editar(adqui){
    this.openDialog(adqui)
  }
  openDialog(adqui?): void{
    const config ={
      data: adqui
        //message: cuenta ? 'edit cuenta': 'new cuenta',
        //content: cuenta
    };
  const dialogRef = this.dialog.open(CrearAdquiComponent, config);
  dialogRef.afterClosed().subscribe(
    res => {
      console.log(`Dialog result ${res}`);
      this.ngOnInit()
    }
  )
 }
  eliminar(adqui){
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
        this.taskService.deleteadqui(adqui)
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

}



