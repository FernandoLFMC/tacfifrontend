import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ActivoService } from '../../service/activo.service';
import { AuthService } from '../../service/auth.service';
import { ExportxlsxService } from '../../service/exportxlsx.service';
import { TaskService } from '../../service/task.service';
import { ComputacionListComponent } from '../computacion-list/computacion-list.component';
import { MovimientosComponent } from '../../activonew/movimientos/movimientos.component';

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
  dataSources = new MatTableDataSource();

  

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

  displayedColumns: string[] = [/*'id_activo',*/'codigo','seccion','funcionario','nombre_tipo','descripcion',
  'unidad','estado','detalles','mover','editar','eliminar'];


  seccion:[]
  funcionario:[]
  cuenta:[]
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.activoService.getactivo()
    .subscribe(
      res => {
        this.combertir(res)
      },
      err=>{
        console.log(err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
    this.taskservice.getTask()
      .subscribe(
        res=>{this.seccion=res},
          err=> console.log(err)
      )
    this.taskservice.listfuncionario()
      .subscribe(
        res=>{this.funcionario=res},
        err=>console.log(err)
      )
    this.taskservice.listarcuenta()
    .subscribe(
      res=>{this.cuenta=res},
    err=>console.log('err cuenta',err)
    )
  }
  combertir(activos){
    const resultActivos=[]
    for(const post of activos){
      const listactivo={
        id_activo:"",
        codigo:"",
        seccion:"",
        funcionario:"",
        nombre_tipo:"",
        descripcion:"",
        unidad:"",
        estado:""
      }
      listactivo.id_activo=post.id_activo;
      listactivo.codigo=post.id_cuenta+'-'+post.id_coop+'-'+post.cod_tipo;
      listactivo.seccion=post.cod_seccion;
      listactivo.funcionario=post.id_funcionario;
      listactivo.nombre_tipo=post.nombre_tipo;
      listactivo.estado=post.estado_op_nop;
      listactivo.unidad=post.unidad;
      if(post.id_cuenta==173 && post.mobiliarioenseres){
        listactivo.descripcion='Color: '+post.mobiliarioenseres.color+', '+' Material: '+post.mobiliarioenseres.material+' Descripcion: '+post.descripcion;
      }else{
        if(post.id_cuenta==171 && post.terrenos){
          listactivo.descripcion='Ciudad: '+post.terrenos.ciudad+', '+' Cod. Catastro: '+post.terrenos.cod_catastro+', '+' Departamento: '+post.terrenos.departamento
          +', '+' Direccion: '+post.terrenos.direccion+', '+' Matricula DDRR: '+post.terrenos.matricula_ddrr+', '+' Propietario: '+post.terrenos.propietario
          +', '+' Superficie: '+post.terrenos.superficie+', '+' Descripcion: '+post.descripcion;
        }else{
          if(post.id_cuenta==172 && post.edificios){
            listactivo.descripcion='Ciudad: '+post.edificios.ciudad+', '+' Cod. Catastro: '+post.edificios.cod_catastro+', '+' Departamento: '+post.edificios.departamento
            +', '+' Direccion: '+post.edificios.direccion+', '+' Matricula DDRR: '+post.edificios.matricula_ddrr+', '+' Propietario: '+post.edificios.propietario
            +', '+' Superficie: '+post.edificios.superficie+', '+' Descripcion: '+post.descripcion;
          }else{
            if(post.id_cuenta==174 && post.equiposinstalacion){
              listactivo.descripcion='Color: '+post.equiposinstalacion.color +', '+' Industria: '+post.equiposinstalacion.industria+', '+' Marca: '+post.equiposinstalacion.marca
              +', '+' Modelo: '+post.equiposinstalacion.modelo+', '+' Nro. Serie: '+post.equiposinstalacion.nro_serial+', '+' Tipo: '+post.equiposinstalacion.tipo+', '+' descripcion: '+post.descripcion;
            }else{
              if(post.id_cuenta==175 && post.equiposcomputacion){
                listactivo.descripcion='Color: '+ post.equiposcomputacion.color +', '+' Industria: '+ post.equiposcomputacion.industria+', '+' Marca: '+post.equiposcomputacion.marca
                +', '+' Nro. Serie: '+post.equiposcomputacion.nro_serial+', '+' Tipo: '+post.equiposcomputacion.tipo+', '+' Descripcion: '+post.descripcion;
              }else{
                if(post.id_cuenta==176 && post.vehiculos){
                  listactivo.descripcion='Color: '+post.vehiculos.color +', '+' Marca: '+post.vehiculos.marca+', '+' Modelo: '+post.vehiculos.modelo+', '+' Nro. placa: '+post.vehiculos.nro_placa+', '+' Nro. chasis: '+post.vehiculos.nro_chasis
                  +', '+' Nro. motor: '+post.vehiculos.nro_motor+', '+' Ruat: '+post.vehiculos.ruat+', '+' Tipo: '+post.vehiculos.tipo+', '+' Descripcion: '+post.descripcion;
                }else{
                  listactivo.descripcion=post.descripcion;
                }
              }
            }
          }
        }
      }
      resultActivos.push(listactivo);
    }
    this.dataSource.data=resultActivos;
    this.dataSources.data=resultActivos;
  }


  editar(row, cod){
    if ((typeof cod === 'string') && (cod.indexOf('-') > -1)){
      const str = cod.split('-');
      const cuenta : string=str[0];
      const id:number =row.id_activo
      if(cuenta=="171"){
        this.router.navigate(['/terrenos-new', id])
      }else{
        if(cuenta=="172"){
        this.router.navigate(['/edificios-new', id])
      }else{
        if(cuenta=="173"){
          this.router.navigate(['/moviliario-new', id])
        }else{
          if(cuenta=="174"){
            this.router.navigate(['/instalacion-new', id])
          }else{
            if(cuenta=="175"){
              this.router.navigate(['/computacion-new', id])
            }else{
              if(cuenta=="176"){
                this.router.navigate(['vehiculos-new', id])
              }else{
                if(cuenta > "176"){
                  this.router.navigate(['/otrosedit-new',id])
                }
              }
            }
          }
        } 
      } 
      }
    }
  }

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
        this.activoService.deleteactivo(element)
        .subscribe(
          res =>{ 
            this.ngOnInit()
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
    this.openDialog(id)
  }
  mover(mover){
    console.log('mover id',mover)
    this.openDialogs(mover)
  }
  //esportar l atabla a  un arhcivo escel
  exportAsXLSX(): void{
    this.excelService.exportToExcel(this.dataSource.data, 'my_export')
  }
  exportAsXLSXfilter(): void{
    this.excelService.exportToExcel(this.dataSource.filteredData, 'my_export')
  }

  openDialog(id): void{
     const config={
          data: id
     }
    const dialogRef = this.dialog.open(ComputacionListComponent, config);
    dialogRef.afterClosed().subscribe(
      res => {
        console.log(`Dialog result ${res}`);
      }
    )
  }
  
  openDialogs(id): void{
    const config={
         data: id
    }
   const dialogRef = this.dialog.open(MovimientosComponent, config);
   dialogRef.afterClosed().subscribe(
     res => {
       this.ngOnInit()
       console.log(`Dialog result ${res}`);
     }
   )
  }
}