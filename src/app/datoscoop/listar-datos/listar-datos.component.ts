import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-listar-datos',
  templateUrl: './listar-datos.component.html',
  styleUrls: ['./listar-datos.component.css']
})
export class ListarDatosComponent implements OnInit {

  constructor(private router:Router) { }

  public opened=false;

  ngOnInit(): void {
  }
  enlace(){
    this.router.navigate(['/'])
  }
}
