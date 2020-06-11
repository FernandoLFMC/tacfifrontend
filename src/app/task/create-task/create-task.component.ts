import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

import { ActivoService } from '../../service/activo.service'


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  createTask:{
    cod_seccion: 10,
    nombre_seccion:""
  }

  selectedValue: number;
  selectedCar: string;

  seccion: [ ];

  cuenta=171
   numero:number;
   nume:number
  num=(this.cuenta+this.numero);

  constructor(private taskService: TaskService,
    private activoservice: ActivoService,
    private router: Router,
    private snackBar: MatSnackBar) { }

    activo:[]

  ngOnInit(): void {
    this.activoservice.getIdActivo()
    .subscribe(
      res=>{
        //this.activo=res
        console.log('id activo res',this.activo)
      },
      err=>console.log('err activo', err)
    )
    /*this.taskService.getTask()
    .subscribe(
      res=>{
        this.seccion=res
        console.log('respuesta',this.seccion)
      },
      err=>{
        console.log('error',err)
      }
    )*/
  }

  create(){
    var a = 1
    if(this.numero){
    for (var i = 0; i < this.activo.length; i++){
            a= a+1
    }}

    console.log('enviado create', this.selectedValue)
    console.log('nume',a)
      //console.log('codigo que se envia',this.selectedValue)
    /*this.taskService.createTask(this.createTask)
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
    )*/ 
  }

}
