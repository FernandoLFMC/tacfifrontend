import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service'
import { TaskService } from '../service/task.service'

import { Router } from '@angular/router'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //toppingList: string[] = ["user","admin","cliente"];

  selected = "user"

  signUpUser={
    id_funcionario:"004",
    username: "",
    role:[""],
    password:""
  }

  constructor(private auth: AuthService,private router: Router,
              private task: TaskService) { }


  funcionario:[]

  ngOnInit(): void {
    this.task.listfuncionario()
    .subscribe(
      res=>this.funcionario=res,
      err=>console.log('err de funcionario', err)
    )
  }

  signUp(){
    console.log(this.signUpUser)
    this.signUpUser.role=[this.selected]
    this.auth.signUpUser(this.signUpUser)
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
