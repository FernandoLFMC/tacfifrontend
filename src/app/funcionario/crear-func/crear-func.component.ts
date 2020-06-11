import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'



@Component({
  selector: 'app-crear-func',
  templateUrl: './crear-func.component.html',
  styleUrls: ['./crear-func.component.css']
})
export class CrearFuncComponent implements OnInit {

  constructor(private taskService: TaskService,
    public dialog: MatDialogRef<CrearFuncComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }
  
  funcionario = {
    id_funcionario:"",
    cod_seccion:"",
    id_coop:"",
    id_profesion:"",
    ci:"",
    nombre:"",
    ap_paterno:"",
    ap_materno:"",
    cargo:""
  }
  editfunc = {
    id_funcionario:"",
    cod_seccion:"",
    id_coop:"",
    id_profesion:"",
    ci:"",
    nombre:"",
    ap_paterno:"",
    ap_materno:"",
    cargo:""
  }

  seccion:[]
  coop:[]
  ngOnInit(): void {
    this.taskService.getTask()
    .subscribe(
      res=>this.seccion=res,
        err=> console.log(err)
    )
    this.taskService.listarcoop()
    .subscribe(
      res=>this.coop=res,
      err=>console.log(err)
    )
    if(this.data){
      this.datas(this.data)
    }
  }
  datas(data){
    this.editfunc.id_funcionario=data.id_funcionario
    this.editfunc.cod_seccion=data.cod_seccion
    this.editfunc.id_coop=data.id_coop
    this.editfunc.id_profesion=data.id_profesion
    this.editfunc.ci=data.ci
    this.editfunc.nombre=data.nombre
    this.editfunc.ap_paterno=data.ap_paterno
    this.editfunc.ap_materno=data.ap_materno
    this.editfunc.cargo=data.cargo
  }
  crear(){
    this.taskService.createfunc(this.funcionario)
    .subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }
  editar(){
    this.taskService.editfunc(this.editfunc)
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
