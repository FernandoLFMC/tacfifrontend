import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    public dialog: MatDialogRef<CrearCuentaComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

  ngOnInit(): void {
    if(this.data){
      this.datas(this.data)
    }
  }

  datas(data){
    this.editcuenta.id_cuenta= data.id_cuenta
    this.editcuenta.descripcion_cuenta=data.descripcion_cuenta
  }
    //crear una cuenta para activo
    editcuenta = {
      id_cuenta:"",
      descripcion_cuenta: ""
    }
    cuenta = {
      id_cuenta:"",
      descripcion_cuenta: ""
    }

    create(){
      this.taskService.crearcuenta(this.cuenta)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/listarcsc'])
          Swal.fire('Creado', 'Se ha creado correctamente', 'success')
        },
        err => {
          console.log(err)
          Swal.fire('Error', 'No se pudo crear', 'error')
        }
      )
    }
    edit(){
      //this.taskService.crearcuenta(this.editcuenta)
      this.taskService.editcuenta(this.editcuenta)
      .subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/listarcsc'])
          Swal.fire('Editado', 'Se ha editado correctamente', 'success')
        },
        err => {
          console.log(err)
          Swal.fire('Error', 'No se pudo editar', 'error')
        }
      )
    }
}
