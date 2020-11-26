import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service'
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import Swal from 'sweetalert2';
import { Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-crear-coop',
  templateUrl: './crear-coop.component.html',
  styleUrls: ['./crear-coop.component.css']
})
export class CrearCoopComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialogRef<CrearCoopComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

    cooperativa= this.fb.group({
      id_coop:['',Validators.required],
      nombre:['',Validators.required],
      ciudad:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required],
      nit:['',Validators.required],
      correo:"",
      url:""
    })

    get id_coop(){return this.cooperativa.get('id_coop');}
    get nombre(){return this.cooperativa.get('nombre');}
    get ciudad(){return this.cooperativa.get('ciudad');}
    get direccion(){return this.cooperativa.get('direccion');}
    get telefono(){return this.cooperativa.get('telefono');}
    get nit(){return this.cooperativa.get('nit');}

    getErrorMessage(field: string){
      let message;
      if(this.cooperativa.get(field).errors.required){
        message = 'Requiere datos...';
      }
      return message;
    }
    isValidField(field: string): boolean {
      return ((this.cooperativa.get(field).touched || this.cooperativa.get(field).dirty) && 
      !this.cooperativa.get(field).valid);
    }

  ngOnInit(): void {
    if(this.data){
      this.cooperativa.setValue(this.data);
      console.log('datadialog',this.cooperativa.value)
    }
  }
  
  createcoop(){
    if(this.cooperativa.status == "VALID"){
      this.taskService.cratecoop(this.cooperativa.value)
      .subscribe(
        res => {
          console.log('res',res)
          this.router.navigate(['/list-coop'])
          Swal.fire('Creado', 'Se ha creado correctamente', 'success')
        },
        err => {
          console.log('err',err)
          Swal.fire('Error', 'No se pudo crear', 'error')
        }
      )
    }else {if (this.cooperativa.status == "INVALID"){
        console.log('es invalido')
        Swal.fire('Error', 'No se pudo crear: Datos incorrectos o vacios', 'error')
      }
    }
  }
  editarCoop(){
    if(this.cooperativa.status == "VALID"){
      this.taskService.editcoop(this.cooperativa.value)
      .subscribe(
        res => {
          console.log('res',res)
          this.router.navigate(['/list-coop'])
          Swal.fire('Editado', 'Se ha editado correctamente', 'success')
        },
        err => {
          console.log('err',err)
          Swal.fire('Error', 'No se pudo editar', 'error')
        }
      )
    }else {if (this.cooperativa.status == "INVALID"){
      console.log('es invalido')
      Swal.fire('Error', 'No se pudo editar: Datos incorrectos o vacios', 'error')
    }}
  }
}
