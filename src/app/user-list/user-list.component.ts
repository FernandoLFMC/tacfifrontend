import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service'

import { MatTableDataSource} from '@angular/material/table'
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(public dialog:MatDialog,
    private authserv:AuthService) { }

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['id_funcionario','username','password','role','accion'];

  ngOnInit(): void {
    this.authserv.listuser()
    .subscribe(
      res=>{console.log('res userlist', res)
      this.dataSource.data=res
      console.log('data', this.dataSource)},
      err=>console.log('err userlist',err)
    )
  }

  editar(edit){
    console.log(edit)
  }

  eliminar(cuenta){
    Swal.fire({
      title:'Estas Seguro',
      text: `No se podra revertir este proceso`,
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'SI, Eliminar!'
    }).then(result =>{
      if(result.value){
        this.authserv.deleteuser(cuenta)
        .subscribe(
          res =>{ 
            this.ngOnInit()
          console.log(res)
          Swal.fire('Eliminado', 'Se ha eliminado corectamente', 'success')
        },
          err =>{
            console.log(err)
            Swal.fire('Error', 'No se pudo eliminar', 'error')
          }
        )
      }
    })
  }

  /*{
    "id": 12,
    "id_funcionario": "006",
    "username": "cuellar",
    "password": "$2a$10$4KGtXL3n3OmH5F6Ra/lUhO8Ag.9JCp6zBlBsUgU0RI1iFCXNFVPva",
    "roles": [
        {
            "id": 3,
            "name": "ROLE_ADMIN"
        }
    ]
}*/


}
