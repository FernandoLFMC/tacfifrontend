import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from '../service/auth.service'
import { Router } from '@angular/router'
import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  rol="";
  admin="admin";
  user="user";
  cliente="pm";

  loginUser={
    username:"",
    password:""
  }

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    /*this.auth.roladmin()
    .subscribe(
      res => {
        this.rol=this.admin
        console.log(this.rol)
      }
    )*/
    this.auth.loginUser(this.loginUser)
    .subscribe(
      res => {
        console.log(res)
        //guarda el token en el local storage
        localStorage.setItem('token', res.accessToken)
        //verificacion del rol de usuario
        this.auth.roladmin()
         .subscribe(
        res => {
          //console.log(res)
          //this.rol=this.admin
          localStorage.setItem('rol', this.admin)
          console.log(this.rol)
        },
        err => {
          this.auth.roluser()
          .subscribe(
            res => {
              //this.rol=this.user
              localStorage.setItem('rol', this.user)
              console.log(this.rol)
            },
            err => {
              this.auth.rolpm()
              .subscribe(
                res => {
                //this.rol=this.cliente
                localStorage.setItem('rol', this.cliente)
                console.log(this.rol)
                },
                err=> console.log(err)
              )
            }
          )
        }
      )
        //nos direcciona a la ventana de /task (tareas)
        this.router.navigate(['/tasks'])
      },
      err => {
        console.log(err)
        if(err.status==0){
          Swal.fire('Error', 'Error, no existe coneccion con el servidor', 'error')
        }
        if(err.status==500){
          Swal.fire('Error', 'Error, Usuario o contraseña Incorrecto', 'error')
        }
      }
    )
  }

}
