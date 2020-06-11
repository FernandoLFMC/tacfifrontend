import { Component, OnInit } from '@angular/core';
import {TaskService } from '../../service/task.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-crear-csc',
  templateUrl: './crear-csc.component.html',
  styleUrls: ['./crear-csc.component.css']
})
export class CrearCscComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    private snackBar: MatSnackBar) { }


  ngOnInit(): void {
  }
  //crear una cuenta para activo
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
      },
      err => {
        console.log(err)
      }
    )
  }
  //crear una seccion de activo
  createTask={
    cod_seccion:"",
    nombre_seccion:""
  }
  createC(){
    this.taskService.createTask(this.createTask)
      .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/tasks'])
      },
      err => {
        console.log(err)
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.snackBar.open("No estas logeado... Enviando a Login", null, {
              duration: 2000
            })
            this.router.navigate(['/login'])
          }
        }
      }
    ) 
  }
  //crear COOPERATIVA
  cooperativa={
    id_coop:"",
    nombre:"",
    ciudad:"",
    direccion:"",
    telefono:"",
    nit:"",
    correo:"",
    url:""
  }
  createcoop(){
    this.taskService.cratecoop(this.cooperativa)
    .subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )

  }
}
