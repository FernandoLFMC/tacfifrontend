import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service'
import { TaskService } from '../service/task.service'
import { Validators, FormBuilder, FormControl } from '@angular/forms';

import { Router } from '@angular/router'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  constructor(private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private task: TaskService) { }

  //toppingList: string[] = ["user","admin","cliente"];

  selected = "user"

  signUpUser=this.fb.group({
    id_funcionario:["",Validators.required],
    username:["",Validators.required],
    role:["",Validators.required],
    password:["",Validators.required]
  })
  getErrorMessage(field: string){
    let message;
    if(this.signUpUser.get(field).errors.required){
      message = 'Requiere datos...';
    }
    return message; 
  }
  isValidField(field: string): boolean {
    return ((this.signUpUser.get(field).touched || this.signUpUser.get(field).dirty) && 
    !this.signUpUser.get(field).valid);
  }


  funcionario:[]

  ngOnInit(): void {
    this.task.listfuncionario()
    .subscribe(
      res=>this.funcionario=res,
      err=>console.log('err de funcionario', err)
    )
  }

  signUp(){
    if(this.signUpUser.status == "VALID"){
      const sign={
        id_funcionario:this.signUpUser.value.id_funcionario,
        username:this.signUpUser.value.username,
        role:[this.signUpUser.value.role],
        password:this.signUpUser.value.password
      }
      this.auth.signUpUser(sign)
        .subscribe(
          res=>console.log(res),
          err => {console.log(err)
            if(err.status==200){
              this.router.navigate(['/list-user'])
            Swal.fire('Creado', 'Se ha creado correctamente', 'success')
            }else{
              if(err.status==400){
                Swal.fire('Error', 'El nombre de usuario ya existe', 'error')
              }else{
                Swal.fire('Error', 'No se pudo crear, faltan datos', 'error')
              }
            }
          }
        )
    }
  }

}
