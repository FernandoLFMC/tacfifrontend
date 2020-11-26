import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar'

import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-adqui',
  templateUrl: './crear-adqui.component.html',
  styleUrls: ['./crear-adqui.component.css']
})
export class CrearAdquiComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialogRef<CrearAdquiComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

    createadqui= this.fb.group({
      id_adquisicion:['',Validators.required],
      porcentaje:"",
      nombre_tipo_adq:['',Validators.required]
    })

    get id_adquisicion(){return this.createadqui.get('id_adquisicion');}
    get nombre_tipo_adq(){return this.createadqui.get('nombre_tipo_adq');}

    getErrorMessage(field: string){
      let message;
      if(this.createadqui.get(field).errors.required){
        message = 'Requiere datos...';
      }
      return message;
    }
    isValidField(field: string): boolean {
      return ((this.createadqui.get(field).touched || this.createadqui.get(field).dirty) && 
      !this.createadqui.get(field).valid);
    }

  ngOnInit(): void {
    if(this.data){
      this.createadqui.setValue(this.data)
    }
  }
    //crear una cuenta para activo

  create(){
    if(this.createadqui.status == "VALID"){
      this.taskService.createadqui(this.createadqui.value)
      .subscribe(
        res => {
          console.log('resp',res)
          Swal.fire('Creado', 'Se ha creado correctamente', 'success')
          //this.snackBar.open("  Se creo correctamente....", null, {duration: 5000})
        },
        err => {
          console.log('err',err)
          Swal.fire('Error', 'No se pudo crear', 'error')
        }
      )
    }else {if (this.createadqui.status == "INVALID"){
        console.log('es invalido')
        Swal.fire('Error', 'No se pudo crear: Datos incorrectos o vacios', 'error')
      }
    }
  }
  edit(){
    if(this.createadqui.status == "VALID"){
      this.taskService.editadqui(this.createadqui.value)
      .subscribe(
        res => {
          console.log('res',res)
          Swal.fire('Editado', 'Se ha editado correctamente', 'success')
        },
        err => {
          console.log('err',err)
          Swal.fire('Error', 'No se pudo editar', 'error')
        }
      )
    }else {if (this.createadqui.status == "INVALID"){
      console.log('es invalido')
      Swal.fire('Error', 'No se pudo editar: Datos incorrectos', 'error')
    }}
  }

}
