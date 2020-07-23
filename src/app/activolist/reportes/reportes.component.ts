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
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public authService: AuthService,
    private activoService: ActivoService,
    private taskservice: TaskService,
    private excelService: ExportxlsxService,
    private router:Router,private atciroute: ActivatedRoute,
    public dialog:MatDialog) { }

    dataSource = new MatTableDataSource();
    dataSources = new MatTableDataSource();
    displayedColumns: string[] = ['cuenta','coop','cod_tipo','seccion','funcionario','nombre_tipo','descripcion','estado'];

    report: string="todos"
    tipo: string="todos"
    reporte(value: any, arg:any, aaa:any):any{
      //console.log('res filter', value, arg)
      const resultPost = []
      if(aaa=='todos'){
        this.dataSources.data=this.dataSource.data
      }else{
        if(aaa=='sec'){
          for (const post of value){
            if (post.seccion.toLowerCase().indexOf(arg.toLowerCase()) > -1){
              resultPost.push(post);
            };
          };
          this.dataSources.data = resultPost;
        }else{
          if(aaa=='func'){
            for (const post of value){
              if (post.funcionario.toLowerCase().indexOf(arg.toLowerCase()) > -1){
                resultPost.push(post);
              };
            };
            this.dataSources.data = resultPost;
          }else{
            if(aaa=='cuenta'){
              for (const post of value){
                if (post.cuenta==arg){
                  resultPost.push(post);
                };
              };
              this.dataSources.data = resultPost;
            }
          }
        }
      }
      console.log('return',resultPost)
      return resultPost;
    }

    combertir(activos):any{
      const resultActivos=[]
      for(const post of activos){
        const listactivo={
          cuenta:"",
          coop:"",
          cod_tipo:"",
          seccion:"",
          funcionario:"",
          nombre_tipo:"",
          descripcion:"",
          estado:"",
          verificar:""
        }
        listactivo.cuenta=post.id_cuenta;
        listactivo.coop=post.id_coop;
        listactivo.cod_tipo=post.cod_tipo;
        listactivo.seccion=post.cod_seccion;
        listactivo.funcionario=post.id_funcionario;
        listactivo.nombre_tipo=post.nombre_tipo;
        listactivo.estado=post.estado_op_nop;
        listactivo.verificar='O'
        if(post.id_cuenta==173){
          listactivo.descripcion='Color: '+post.mobiliarioenseres.color +' Material: '+post.mobiliarioenseres.color+' Descripcion: '+post.descripcion;
        }else{
          if(post.id_cuenta==171){
            listactivo.descripcion='Ciudad: '+post.terrenos.ciudad+' Cod. Catastro: '+post.terrenos.cod_catastro+' Departamento: '+post.terrenos.departamento
            +' Direccion: '+post.terrenos.direccion+' Matricula DDRR: '+post.terrenos.matricula_ddrr+' Propietario: '+post.terrenos.propietario
            +' Superficie: '+post.terrenos.superficie+' Descripcion: '+post.descripcion;
          }else{
            if(post.id_cuenta==172){
              listactivo.descripcion='Ciudad: '+post.edificios.ciudad+' Cod. Catastro: '+post.edificios.cod_catastro+' Departamento: '+post.edificios.departamento
              +' Direccion: '+post.edificios.direccion+' Matricula DDRR: '+post.edificios.matricula_ddrr+' Propietario: '+post.edificios.propietario
              +' Superficie: '+post.edificios.superficie+' Descripcion: '+post.descripcion;
            }else{
              if(post.id_cuenta==174){
                listactivo.descripcion='Color: '+post.equiposinstalacion.color +' Industria: '+post.equiposinstalacion.industria+' Marca: '+post.equiposinstalacion.marca
                +' Modelo: '+post.equiposinstalacion.modelo+' Nro. Serie: '+post.equiposinstalacion.nro_serial+' Tipo: '+post.equiposinstalacion.tipo+' descripcion: '+post.descripcion;
              }else{
                if(post.id_cuenta==175){
                  listactivo.descripcion='Color: '+post.equiposcomputacion.color +' Industria: '+post.equiposcomputacion.industria+' Marca: '+post.equiposcomputacion.marca
                  +' Nro. Serie: '+post.equiposcomputacion.nro_serial+' Tipo: '+post.equiposcomputacion.tipo+' Descripcion: '+post.descripcion;
                }else{
                  if(post.id_cuenta==176){
                    listactivo.descripcion='Color: '+post.vehiculos.color +' Marca: '+post.vehiculos.marca+' Modelo: '+post.vehiculos.modelo+' Nro. placa: '+post.vehiculos.nro_placa+' Nro. chasis: '+post.vehiculos.nro_chasis
                    +' Nro. motor: '+post.vehiculos.nro_motor+' Ruat: '+post.vehiculos.ruat+' Tipo: '+post.vehiculos.tipo+' Descripcion: '+post.descripcion;
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
      console.log('result activos', this.dataSource.data)
      return resultActivos
    }
  
    seccion:[]
    funcionario:[]
    cuenta:[]
    activos:[]
  ngOnInit(): void {
    //this.dataSource.paginator = this.paginator;
    this.dataSources.sort = this.sort;
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
    this.activoService.getactivo()
    .subscribe(
      res => {
        //this.dataSource.data=res
        this.activos=res
        console.log('respons list activo',this.activos)//this.dataSource.data)
        this.combertir(this.activos)
      },
      err=>{
        console.log(err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
  }

  exportAsXLSX(): void{
    this.excelService.exportToExcel(this.dataSources.data, 'my_export')
  }
  
}
