import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { AuthService } from '../service/auth.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //toppingList: string[] = ["user","admin","cliente"];

  selected = "pm"

  signUpUser={
    id_funcionario:"",
    username: "",
    role:[""],
    password:""
  }

  constructor(private auth: AuthService) { }


  ngOnInit(): void {
  }

  signUp(){
    console.log(this.signUpUser)
    /*this.signUpUser.role=[this.selected]
    this.auth.signUpUser(this.signUpUser)
      .subscribe(
        res => {
          console.log(res)
        },
        err => console.log(err)
      )*/
  }

}
