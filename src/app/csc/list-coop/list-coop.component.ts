import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { AuthService } from '../../service/auth.service'

import { MatTableDataSource} from '@angular/material/table'
//alertas de eliminar
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { CrearCoopComponent } from '../crear-coop/crear-coop.component'

@Component({
  selector: 'app-list-coop',
  templateUrl: './list-coop.component.html',
  styleUrls: ['./list-coop.component.css']
})
export class ListCoopComponent implements OnInit {

  constructor(public authService: AuthService, private taskService: TaskService,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.taskService.listarcoop()
    .subscribe(
      res => {
        this.dataSourcec = res
      },
      err => { 
        console.log(err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
  }

  //funciones para la cooperativa
  dataSourcec = [];
  displayedColumnsc: string[] = ['id_coop','nombre','ciudad','direccion','telefono','nit','correo','url','accion'];

  editarC(coop){
    this.openDialogC(coop)
    this.ngOnInit()
  }
  crearC(){
    this.openDialogC()
    this.ngOnInit()
  }
  openDialogC(coop?): void{
    const config={
      data: coop
    }
    const dialogRef = this.dialog.open(CrearCoopComponent, config);
    dialogRef.afterClosed().subscribe(
      res => {
        this.ngOnInit()
        console.log(`Dialog result ${res}`);
      }
    )
  }
  eliminarC(coop){
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
        this.taskService.deletecoop(coop)
        .subscribe(
          res =>{ 
            this.ngOnInit()
          console.log(res)
          Swal.fire('Eliminado', 'Se ha eliminado corectamente', 'success')
        },
          err =>{
            if(err.status == 500){
              Swal.fire('Error', 'No se puede eliminar, existe activos designados a esta Coop.', 'error')
            }else{
              Swal.fire('Error', 'No se pudo eliminar', 'error')
            }
          }
        )
      }
    })

  }
}
