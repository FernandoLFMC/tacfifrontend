import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-adqui',
  templateUrl: './crear-adqui.component.html',
  styleUrls: ['./crear-adqui.component.css']
})
export class CrearAdquiComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    public dialog: MatDialogRef<CrearAdquiComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

    createadqui={
      id_adquisicion:"",
      porcentaje:"",
      nombre_tipo_adq:""
    }

  ngOnInit(): void {
    if(this.data){
      this.datas(this.data)
    }
  }
  datas(data){
    this.editadqui.id_adquisicion= data.id_adquisicion
    this.editadqui.porcentaje=data.porcentaje
    this.editadqui.nombre_tipo_adq=data.nombre_tipo_adq
  }
    //crear una cuenta para activo
    editadqui = {
      id_adquisicion:"",
      porcentaje:"",
      nombre_tipo_adq:""
    }

  create(){
    this.taskService.createadqui(this.createadqui)
    .subscribe(
      res => {
        console.log(res)
        Swal.fire('Creado', 'Se ha creado correctamente', 'success')
      },
      err => {
        console.log(err)
        Swal.fire('Error', 'No se pudo crear', 'error')
      }
    ) 
  }
  edit(){
    console.log(this.editadqui)
    this.taskService.editadqui(this.editadqui)
    .subscribe(
      res => {
        console.log(res)
        Swal.fire('Editado', 'Se ha editado correctamente', 'success')
      },
      err => {
        console.log(err)
        Swal.fire('Error', 'No se pudo editar', 'error')
      }
    )
  }

}
