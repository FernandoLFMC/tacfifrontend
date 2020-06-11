import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-seccion',
  templateUrl: './crear-seccion.component.html',
  styleUrls: ['./crear-seccion.component.css']
})
export class CrearSeccionComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    public dialog: MatDialogRef<CrearSeccionComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

    createTask={
      cod_seccion:"",
      nombre_seccion:""
    }

  ngOnInit(): void {
    if(this.data){
      this.datas(this.data)
    }
  }
  datas(data){
    this.editseccion.cod_seccion= data.cod_seccion
    this.editseccion.nombre_seccion=data.nombre_seccion
  }
    //crear una cuenta para activo
    editseccion = {
      cod_seccion:"",
      nombre_seccion: ""
    }
    sec=""

  create(){
    this.taskService.createTask(this.createTask)
    .subscribe(
      res => {
        console.log('respuesta del de registro',res.cod_seccion)
        this.sec=res.cod_seccion
        console.log('seccion res',this.sec)
        this.router.navigate(['/list-seccion'])
        Swal.fire('Creado', 'Se ha creado correctamente', 'success')
      },
      err => {
        console.log(err)
        Swal.fire('Error', 'No se pudo crear', 'error')
      }
    ) 
  }
  edit(){
    console.log(this.editseccion)
    this.taskService.putTask(this.editseccion)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/list-seccion'])
        Swal.fire('Editado', 'Se ha editado correctamente', 'success')
      },
      err => {
        console.log(err)
        Swal.fire('Error', 'No se pudo editar', 'error')
      }
    )
  }

}
