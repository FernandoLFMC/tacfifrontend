import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router'
import { Validators, FormBuilder } from '@angular/forms';

import Swal from 'sweetalert2';

interface estad {
  value: string;
}

@Component({
  selector: 'app-crear-func',
  templateUrl: './crear-func.component.html',
  styleUrls: ['./crear-func.component.css']
})
export class CrearFuncComponent implements OnInit {

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialogRef<CrearFuncComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }
  
  funcionario = this.fb.group({
    id_funcionario:['',Validators.required],
    cod_seccion:['',Validators.required],
    id_coop:['',Validators.required],
    id_profesion:['',Validators.required],
    ci:['',Validators.required],
    nombre:['',Validators.required],
    ap_paterno:['',Validators.required],
    ap_materno:"",
    cargo:"",
    estado:['',Validators.required],
  })

  estados : estad[] = [{value: 'Operativo'}, {value: 'No operativo'}]

  getErrorMessage(field: string){
    let message;
    if(this.funcionario.get(field).errors.required){
      message = 'Requiere datos...';
    }
    return message;
  }
  isValidField(field: string): boolean {
    return ((this.funcionario.get(field).touched || this.funcionario.get(field).dirty) && 
    !this.funcionario.get(field).valid);
  }

  
  profesions= this.fb.group({
    nomb_profesion:['',Validators.required]
  })
  getErrorMessages(field: string){
    let message;
    if(this.profesions.get(field).errors.required){
      message = 'Requiere datos...';
    }
    return message;
  }
  isValidFields(field: string): boolean {
    return ((this.profesions.get(field).touched || this.profesions.get(field).dirty) && 
    !this.profesions.get(field).valid);
  }

  seccion:[]
  coop:[]
  profesion:[]
  
  ngOnInit(): void {
    this.taskService.getTask()
    .subscribe(
      res=>{res.sort(function (a, b) {return a.cod_seccion.localeCompare(b.cod_seccion);});
        this.seccion=res},
      err=> console.log(err)
    )
    this.taskService.listprofes()
    .subscribe(
      res=>{console.log('res profesion',res)
        this.profesion=res},
      err=> console.log('err list profesion',err)
    )
    this.taskService.listarcoop()
    .subscribe(
      res=>this.coop=res,
      err=>console.log(err)
    )
    if(this.data){
      this.funcionario.setValue(this.data)
    }
  }
  
  create(){
    if(this.funcionario.status == "VALID"){
      this.taskService.createfunc(this.funcionario.value)
      .subscribe(
        res => {
          console.log('res',res)
          this.router.navigate(['/listar-func'])
          Swal.fire('Creado', 'Se ha creado correctamente', 'success')
        },
        err => {
          console.log('err',err)
          Swal.fire('Error', 'No se pudo crear', 'error')
        }
      )
    }else {if (this.funcionario.status == "INVALID"){
        console.log('es invalido')
        Swal.fire('Error', 'No se pudo crear: Datos incorrectos o vacios', 'error')
      }
    }
  }

  edit(){
    if(this.funcionario.status == "VALID"){
      this.taskService.editfunc(this.funcionario.value)
      .subscribe(
        res => {
          console.log('res',res)
          this.router.navigate(['/listar-func'])
          Swal.fire('Editado', 'Se ha editado correctamente', 'success')
        },
        err => {
          console.log('err',err)
          Swal.fire('Error', 'No se pudo editar', 'error')
        }
      )
    }else {if (this.funcionario.status == "INVALID"){
      console.log('es invalido')
      Swal.fire('Error', 'No se pudo editar: Datos incorrectos o vacios', 'error')
    }}
  }
  
  cont = 5;
  createprof(){
    console.log('env prof',this.profesions.value)
    this.taskService.createprofes(this.profesions.value)
    .subscribe(
      res => {
        console.log('res prof',res)
        this.taskService.listprofes()
        .subscribe(
          res=>{console.log('res profesion',res)
            this.profesion=res},
          err=> console.log('err list profesion',err)
        )
        this.funcionario.patchValue({id_profesion : res.id_profesion})
      },
      err => {
        console.log('err prof',err)
      }
    )
  }

}
