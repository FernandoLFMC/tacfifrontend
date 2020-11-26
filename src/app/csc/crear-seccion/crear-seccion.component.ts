import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Validators, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-seccion',
  templateUrl: './crear-seccion.component.html',
  styleUrls: ['./crear-seccion.component.css']
})
export class CrearSeccionComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialogRef<CrearSeccionComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

    createTask= this.fb.group({
      cod_seccion: ['',Validators.required],
      nombre_seccion:['',Validators.required]
    })
    get nombre_seccion(){return this.createTask.get('nombre_seccion');}
    get cod_seccion(){return this.createTask.get('cod_seccion');}

    getErrorMessage(field: string){
      let message;
      if(this.createTask.get(field).errors.required){
        message = 'Requiere datos...';
      }
      return message;
    }
    isValidField(field: string): boolean {
      return ((this.createTask.get(field).touched || this.createTask.get(field).dirty) && 
      !this.createTask.get(field).valid);
    }

  ngOnInit(): void {
    if(this.data){
      this.createTask.setValue(this.data);
    }
  }
    //crear una cuenta para activo
  create(){
    if(this.createTask.status == "VALID"){
      console.log('es valido')
      console.log('res',this.createTask.value)
      this.taskService.createTask(this.createTask.value)
      .subscribe(
        res => {
          console.log('respuesta del de registro',res.cod_seccion)
          this.router.navigate(['/list-seccion'])
          Swal.fire('Creado', 'Se ha creado correctamente', 'success')
        },
        err => {
          console.log(err)
          Swal.fire('Error', 'No se pudo crear', 'error')
        }
      )
    }else {if (this.createTask.status == "INVALID"){
        console.log('es invalido')
        Swal.fire('Error', 'No se pudo crear: Datos incorrectos', 'error')
      }
    }
  }
  edit(){
    if(this.createTask.status == "VALID"){
      this.taskService.putTask(this.createTask.value)
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
    }else {if (this.createTask.status == "INVALID"){
      console.log('es invalido')
      Swal.fire('Error', 'No se pudo editar: Datos incorrectos', 'error')
    }}
  }

}
