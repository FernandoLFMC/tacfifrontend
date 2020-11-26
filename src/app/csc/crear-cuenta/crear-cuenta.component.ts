import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialogRef<CrearCuentaComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }

  ngOnInit(): void {
    if(this.data){
      this.cuenta.setValue(this.data);
    }
  }

    //crear una cuenta para activo
    cuenta = this.fb.group({
      id_cuenta:['',Validators.required],
      descripcion_cuenta: ['',Validators.required]
    })
    get id_cuenta(){return this.cuenta.get('id_cuenta');}
    get descripcion_cuenta(){return this.cuenta.get('descripcion_cuenta');}
    getErrorMessage(field: string){
      let message;
      if(this.cuenta.get(field).errors.required){
        message = 'Requiere datos...';
      }
      return message;
    }
    isValidField(field: string): boolean {
      return ((this.cuenta.get(field).touched || this.cuenta.get(field).dirty) && 
      !this.cuenta.get(field).valid);
    }


    create(){
      if(this.cuenta.status == "VALID"){
        this.taskService.crearcuenta(this.cuenta.value)
        .subscribe(
          res => {
            console.log('resp',res)
            this.router.navigate(['/listarcsc'])
            Swal.fire('Creado', 'Se ha creado correctamente', 'success')
          },
          err => {
            console.log('err',err)
            Swal.fire('Error', 'No se pudo crear', 'error')
          }
        )
      }else {if (this.cuenta.status == "INVALID"){
          console.log('es invalido')
          Swal.fire('Error', 'No se pudo crear: Datos incorrectos o vacios', 'error')
        }
      }
    }
    edit(){
      if(this.cuenta.status == "VALID"){
        this.taskService.editcuenta(this.cuenta.value)
        .subscribe(
          res => {
            console.log('res',res)
            this.router.navigate(['/listarcsc'])
            Swal.fire('Editado', 'Se ha editado correctamente', 'success')
          },
          err => {
            console.log('err',err)
            Swal.fire('Error', 'No se pudo editar', 'error')
          }
        )
      }else {if (this.cuenta.status == "INVALID"){
        console.log('es invalido')
        Swal.fire('Error', 'No se pudo editar: Datos incorrectos', 'error')
      }}
    }
}
