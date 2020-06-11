import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service'
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-coop',
  templateUrl: './crear-coop.component.html',
  styleUrls: ['./crear-coop.component.css']
})
export class CrearCoopComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    public dialog: MatDialogRef<CrearCoopComponent>,
    @Inject(MAT_DIALOG_DATA)public data: ""
  ) { }

  ngOnInit(): void {
    if(this.data){
      this.datas(this.data)
    }
  }

  datas(data){
    this.editCoop.id_coop=data.id_coop
    this.editCoop.nombre=data.nombre
    this.editCoop.ciudad=data.ciudad
    this.editCoop.direccion=data.direccion
    this.editCoop.telefono=data.telefono
    this.editCoop.nit=data.nit
    this.editCoop.correo=data.correo
    this.editCoop.url=data.url
  }
  editCoop={    
    id_coop:"",
    nombre:"",
    ciudad:"",
    direccion:"",
    telefono:"",
    nit:"",
    correo:"",
    url:""

  }
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
        this.router.navigate(['/list-coop'])
        Swal.fire('Creado', 'Se ha creado correctamente', 'success')
      },
      err => {
        console.log(err)
        Swal.fire('Error', 'No se pudo crear', 'error')
      }
    )
  }
  editarCoop(){
    this.taskService.editcoop(this.editCoop)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/list-coop'])
        Swal.fire('Editado', 'Se ha editado correctamente', 'success')
      },
      err => {
        console.log(err)
        Swal.fire('Error', 'No se pudo editar', 'error')
      }
    )
  }
}
