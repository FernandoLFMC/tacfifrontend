import { Component, OnInit, Inject } from '@angular/core';
import {TaskService } from '../../service/task.service';
import { Router } from '@angular/router'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Validators, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-tipo-cuenta',
  templateUrl: './crear-tipo-cuenta.component.html',
  styleUrls: ['./crear-tipo-cuenta.component.css']
})
export class CrearTipoCuentaComponent implements OnInit {

  constructor(private taskService: TaskService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialogRef<CrearTipoCuentaComponent>,
    @Inject(MAT_DIALOG_DATA)public data: "") { }


    tipo_cuenta = this.fb.group({
      id_cuenta:['',Validators.required],
      num: ['',Validators.required],
      nombre: ['',Validators.required]
    })
    getErrorMessage(field: string){
      let message;
      if(this.tipo_cuenta.get(field).errors.required){
        message = 'Requiere datos...';
      }
      return message;
    }
    isValidField(field: string): boolean {
      return ((this.tipo_cuenta.get(field).touched || this.tipo_cuenta.get(field).dirty) && 
      !this.tipo_cuenta.get(field).valid);
    }

  generar(){
    if(this.tipo_cuenta.value.id_cuenta){
      var numb=1000;
      for(const post of this.tipocuenta){
        if(post.id_cuenta == this.tipo_cuenta.value.id_cuenta){
          numb=post.num + 1000;
        }
      }
      this.tipo_cuenta.patchValue({num : numb})
    }else{ this._snackBar.open('Seleccione un tipo de cuenta para generar', 'Codigo', {
      duration: 3000,});}
  }
  
  comprobar(comp: number){
    let message;
    if(this.tipo_cuenta.value.id_cuenta){
      for(const post of this.tipocuenta){
        if(post.id_cuenta == this.tipo_cuenta.value.id_cuenta && post.num==comp){
          message = 'El codigo  ya existe';
          break
        }
      }
    }else{message="Seleccione Cod. Cuenta"}
    return message;
  }

  tipo_cuenta2 = this.fb.group({
    id_num:['',Validators.required],
    id_cuenta:['',Validators.required],
    num: ['',Validators.required],
    nombre: ['',Validators.required]
  })
  getErrorMessages(field: string){
    let message;
    if(this.tipo_cuenta2.get(field).errors.required){
      message = 'Requiere datos...';
    }
    return message;
  }
  isValidFields(field: string): boolean {
    return ((this.tipo_cuenta2.get(field).touched || this.tipo_cuenta2.get(field).dirty) && 
    !this.tipo_cuenta2.get(field).valid);
  }

  cuenta=[]
  tipocuenta=[]
  ngOnInit(): void {
    if(this.data){
      this.tipo_cuenta2.setValue(this.data);
    }
    this.taskService.listarcuenta()
    .subscribe(
      res =>{this.cuenta=res},
      err=>{console.log('erro cuenta', err)}
    )
    this.taskService.getTipocuenta()
    .subscribe(
      res=>{
        res.sort(function (a, b) {return a.num - b.num;});
        this.tipocuenta=res},
      err=>{console.log('err tipo cuenta',err)}
    )
  }

  create(){
    if(this.tipo_cuenta.status == "VALID"){
      this.taskService.createTipocuenta(this.tipo_cuenta.value)
      .subscribe(
        res => {
          console.log('resp',res)
          this.router.navigate(['/listar-tipocuenta'])
          Swal.fire('Creado', 'Se ha creado correctamente', 'success')
        },
        err => {
          console.log('err',err)
          if(err.status == 500){
            Swal.fire('Error', 'El Cod. cuenta con el Codigo tipo de Cuenta EXISTE...', 'error')
          }else{Swal.fire('Error', 'No se pudo crear', 'error')}
        }
      )
    }else {if (this.tipo_cuenta.status == "INVALID"){
        console.log('es invalido')
        Swal.fire('Error', 'No se pudo crear: Datos incorrectos o Vacios', 'error')
      }
    }
  }

  edit(){
    if(this.tipo_cuenta2.status == "VALID"){
      this.taskService.putTipocuenta(this.tipo_cuenta2.value)
      .subscribe(
        res => {
          console.log('res',res)
          this.router.navigate(['/listar-tipocuenta'])
          Swal.fire('Editado', 'Se ha editado correctamente', 'success')
        },
        err => {
          console.log('err',err)
          Swal.fire('Error', 'No se pudo editar', 'error')
        }
      )
    }else {if (this.tipo_cuenta2.status == "INVALID"){
      console.log('es invalido')
      Swal.fire('Error', 'No se pudo editar: Datos incorrectos', 'error')
    }}
  }
}
