import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ActivoService } from '../../service/activo.service';
import { AuthService } from '../../service/auth.service';
import { ExportxlsxService } from '../../service/exportxlsx.service';
import { TaskService } from '../../service/task.service';

import { Router, ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-activo-list',
  templateUrl: './activo-list.component.html',
  styleUrls: ['./activo-list.component.css']
})
export class ActivoListComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  constructor(public authService: AuthService,
              private activoService: ActivoService,
              private taskservice: TaskService,
              private excelService: ExportxlsxService,
              private router:Router,private atciroute: ActivatedRoute,
              public dialog:MatDialog) { }

  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id_activo','id_cuenta','id_coop','cod_tipo','cod_seccion','id_funcionario',
  'nombre_tipo','unidad','estado_op_nop','detalles','mover','editar','eliminar'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //fiñtro de datos para los informes segun seccion, funcionario, cuenta de activo
  
  filtroSeccion(value: any, arg:any):any{
    //console.log('res filter', value, arg)
    const resultPost = []
    for (const post of value){
      if (post.cod_seccion.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPost.push(post);
      };
    };
    console.log('return',resultPost)
    this.dataSource.data = resultPost;
    return resultPost;
  }


  seccion:[]
  funcionario:[]
  cuenta:[]
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.taskservice.getTask()
      .subscribe(
        res=>{console.log('res seccion', res)
         this.seccion=res},
          err=> console.log(err)
      )
    this.taskservice.listfuncionario()
      .subscribe(
        res=>{console.log('res funcionario', res)
          this.funcionario=res},
        err=>console.log(err)
      )
    this.taskservice.listarcuenta()
    .subscribe(
      res=>{this.cuenta=res},
    err=>console.log('err cuenta',err)
    )
    this.activoService.getetiqueta()
    .subscribe(
      res => {
        this.dataSource.data=res
        console.log('respons list activo',this.dataSource.data)
      },
      err=>{
        console.log(err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
  }
  editar(id, cuenta){
    if(cuenta==171){
      this.router.navigate(['/terrenos-new', id])
    }else{
      if(cuenta==172){
      this.router.navigate(['/edificios-new', id])
    }else{
      if(cuenta==173){
        this.router.navigate(['/moviliario-new', id])
      }else{
        if(cuenta==174){
          this.router.navigate(['/instalacion-new', id])
        }else{
          if(cuenta==175){
            this.router.navigate(['/computacion-new', id])
          }else{
            if(cuenta==176){
              this.router.navigate(['vehiculos-new', id])
            }
          }
        }
      } 
    }
      
    }
  }
  /**
   * path: 'terrenos-new/:id',
    component: TerrenosNewComponent
  },
  {
    path: 'edificios-new',
    component: EdificiosNewComponent
  },
  {
    path: 'edificios-new/:id',
    component: EdificiosNewComponent
  },
  {
    path: 'moviliario-new',
    component: MoviliarioNewComponent
  },
  {
    path: 'moviliario-new/:id',
    component: MoviliarioNewComponent
  },
  {
    path: 'instalacion-new',
    component: InstalacionNewComponent
  },
  {
    path: 'instalacion-new/:id',
    component: InstalacionNewComponent
  },
  {
    path: 'computacion-new',
    component: ComputacionNewComponent
  },
  {
    path: 'computacion-new/:id',
    component: ComputacionNewComponent
  },
  {
    path: 'vehiculos-new',
    component: VehiculosNewComponent
  },
  {
    path: 'vehiculos-new/:id',
    component: VehiculosNewComponent
  },
  {
    path: 'otros-new/:id',
   */
  eliminar(element){
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
        console.log('delete', element);
        this.activoService.deleteactivo(element)
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
  detalles(detail){
    const id:number = detail.id_activo
    const cuenta:number=detail.id_cuenta
    if(cuenta==171){
      this.router.navigate(['/lista-terrenos', id])
    }else{
      if(cuenta==172){
        this.router.navigate(['/lista-edificios', id])
      }else{
        if(cuenta==173){
          this.router.navigate(['/lista-moviliario', id])
        }else{
          if(cuenta==174){
            this.router.navigate(['/lista-instalacion', id])
          }else{
            if(cuenta==175){
              this.router.navigate(['/lista-computacion', id])
            }else{
              if(cuenta==176){
                this.router.navigate(['/lista-vehiculos', id])
              }
            }
          }
        }
      }
    }
  }
  mover(mover){
    console.log('mover id',mover)
    this.router.navigate(['/create-movimiento', mover])
  }
  //esportar l atabla a  un arhcivo escel
  exportAsXLSX(): void{
    this.excelService.exportToExcel(this.dataSource.data, 'my_export')
  }
  exportAsXLSXfilter(): void{
    this.excelService.exportToExcel(this.dataSource.filteredData, 'my_export')
  }

  


}