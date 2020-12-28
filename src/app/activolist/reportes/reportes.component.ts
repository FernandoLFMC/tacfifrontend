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
import {MatSnackBar} from '@angular/material/snack-bar';

import { PdfMakeWrapper, Txt, Img, Canvas, Polyline, Table, Columns, Ul, Ol, Item, Cell } from 'pdfmake-wrapper';
import {Utils} from '../../utils/utils'
import { report } from 'process';






//import {jsPDF} from 'jspdf';
//import * as jsPDF from 'jspdf';
//import jsPDF
//import 'jspdf-autotable';
//import {autoTable} from 'jspdf-autotable';
//declare var jsPDF: any;
//import * as jsPDF from 'jspdf';
//import 'jspdf-autotable';
//import * as autoTable  from 'jspdf-autotable';



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
    private _snackBar: MatSnackBar,
    private router:Router,private atciroute: ActivatedRoute,
    public dialog:MatDialog) { }

    dataSource = new MatTableDataSource();
    dataSources = new MatTableDataSource();
    displayedColumns: string[] = ['codigo','seccion','funcionario','nombre_tipo','descripcion','estado'];

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
          this.reportePDF(this.dataSources.data)
          this._snackBar.open('Se a generado correctamente el reporte', 'Por Seccion', {
            duration: 4000,});
        }else{
          if(aaa=='func'){
            for (const post of value){
              if (post.funcionario.toLowerCase().indexOf(arg.toLowerCase()) > -1){
                resultPost.push(post);
              };
            };
            this.dataSources.data = resultPost;
            this.reportePDF(this.dataSources.data)
            this._snackBar.open('Se a generado correctamente el reporte', 'Por Funcionario', {
              duration: 4000,});
          }else{
            if(aaa=='cuenta'){
              for (const post of value){
                if (post.cuenta==arg){
                  resultPost.push(post);
                };
              };
              this.dataSources.data = resultPost;
              this.reportePDF(this.dataSources.data)
              this._snackBar.open('Se a generado correctamente el reporte', 'Por Tipo Cuenta', {
                duration: 4000,});
            }else{
              if(aaa=='ope'){
                for (const post of value){
                  if (post.estado==arg){
                    resultPost.push(post);
                  };
                };
                this.dataSources.data = resultPost;
                this.reportePDF(this.dataSources.data)
                this._snackBar.open('Se a generado correctamente el reporte', 'Por Tipo Cuenta', {
                  duration: 4000,});
              }
            }
          }
        }
      }
      return resultPost;
    }

    combertir(activos):any{
      const resultActivos=[]
      for(const post of activos){
        const listactivo={
          nro:0, 
          cuenta:"",
          codigo:"",
          //coop:"",
          //cod_tipo:"",
          seccion:"",
          funcionario:"",
          nombre_tipo:"",
          descripcion:"",
          estado:"",
          verificar: new Txt('O').alignment("center").fontSize(24).end
        }
        listactivo.cuenta=post.id_cuenta;
        listactivo.codigo=post.id_cuenta+'-'+post.id_coop+'-'+post.cod_tipo;
        //listactivo.coop=post.id_coop;
        //listactivo.cod_tipo=post.cod_tipo;
        listactivo.seccion=post.cod_seccion;
        listactivo.funcionario=post.id_funcionario;
        listactivo.nombre_tipo=post.nombre_tipo;
        listactivo.estado=post.estado_op_nop;
        if(post.id_cuenta==173){
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
                    if(post.id_cuenta > 176){
                      listactivo.descripcion=post.descripcion;
                    }
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
  
    seccion:[]
    funcionario:[]
    cuenta:[]
    activos:[]
    logoDataUrl: string;
    logoEtiqueta:string
  ngOnInit(): void {
    Utils.getImageDataUrlFromLocalPath1('assets/login_logo_glpi-1_resize_38.png').then(
    result => this.logoDataUrl = result)
    Utils.getImageDataUrlFromLocalPath1('assets/login_logo_glpi-1_resize_38.png').then(
    result => this.logoEtiqueta = result)
    //this.dataSource.paginator = this.paginator;
    this.dataSources.sort = this.sort;
    this.taskservice.getTask()
     .subscribe(
      res=>{this.seccion=res},
        err=> console.log(err)
    )
    this.taskservice.listfuncionario()
     .subscribe(
      res=>{ res.sort(function (a, b) {return a.id_funcionario - b.id_funcionario;});
      this.funcionario=res},
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

  exportAsXLSX(value: any): void{
    const resultActivos=[]
    for(const post of value){
      const listactivo={
        codigo:"",
        seccion:"",
        funcionario:"",
        nombre_tipo:"",
        descripcion:"",
        estado:"",
        verificar:""
      }
      listactivo.codigo=post.codigo;
      listactivo.seccion=post.seccion;
      listactivo.funcionario=post.funcionario;
      listactivo.nombre_tipo=post.nombre_tipo;
      listactivo.descripcion=post.descripcion;
      listactivo.estado=post.estado;
      listactivo.verificar='O'

      resultActivos.push(listactivo);
    }
    this.excelService.exportToExcel(resultActivos, 'my_export')
  }

  ceunta171=new MatTableDataSource();
  ceunta172=new MatTableDataSource();
  ceunta173=new MatTableDataSource();
  ceunta174=new MatTableDataSource();
  ceunta175=new MatTableDataSource();
  ceunta176=new MatTableDataSource();
  ceunta177=new MatTableDataSource();
  ceunta178=new MatTableDataSource();
  ceunta179=new MatTableDataSource();
  ceunta180=new MatTableDataSource();
  ceunta181=new MatTableDataSource();
  ceunta182=new MatTableDataSource();
  ceunta183=new MatTableDataSource();
  ceunta184=new MatTableDataSource();
  ceunta185=new MatTableDataSource();
  ceunta186=new MatTableDataSource();
  etiquetas=[]
  async reportePDF(data){
    const ceunta171=[];
    const ceunta172=[];
    const ceunta173=[];
    const ceunta174=[];
    const ceunta175=[];
    const ceunta176=[];
    const ceunta177=[];
    const ceunta178=[];
    const ceunta179=[];
    const ceunta180=[];
    const ceunta181=[];
    const ceunta182=[];
    const ceunta183=[];
    const ceunta184=[];
    const ceunta185=[];
    const ceunta186=[];
    var n171=0;
    var n172=0;
    var n173=0;
    var n174=0;
    var n175=0;
    var n176=0;
    var n177=0;
    var n178=0;
    var n179=0;
    var n180=0;
    var n181=0;
    var n182=0;
    var n183=0;
    var n184=0;
    var n185=0;
    var n186=0;
    const etiquetaData=[];
    for(const post of data){
      const etiquetainfo={
        etiqueta:new Table([
          [    
            await new Img(this.logoEtiqueta).fit([50, 25]).alignment('left').build(),
            new Txt('Coop. de Ahorro y Credito Societaria SAN MARTIN R.L.').bold().italics().alignment("center").fontSize(8).end,
          ],
          ['COD.:', post.codigo]
        ]).alignment('center').widths([27, 100]).fontSize(11).end,
        descripcion:post.descripcion
      }
      etiquetaData.push(etiquetainfo)
      if(post.cuenta==173){
        n173=n173+1;
        post.nro=n173
        ceunta173.push(post);
      }else{
        if(post.cuenta==171){
          n173=n171+1;
          post.nro=n171
          ceunta171.push(post);
        }else{
          if(post.cuenta==172){
            n172=n172+1;
            post.nro=n172
            ceunta172.push(post);
          }else{
            if(post.cuenta==174){
              n174=n174+1;
              post.nro=n174
              ceunta174.push(post);
            }else{
              if(post.cuenta==175){
                n175=n175+1;
                post.nro=n175
                ceunta175.push(post);
              }else{
                if(post.cuenta==176){
                  n176=n176+1;
                  post.nro=n176
                  ceunta176.push(post);
                }else{
                  if(post.cuenta == 177){
                    n177=n177+1;
                    post.nro=n177
                    ceunta177.push(post);
                  }else{
                    if(post.cuenta == 178){
                      n178=n178+1;
                      post.nro=n178
                      ceunta178.push(post);
                    }else{
                      if(post.cuenta == 179){
                        n179=n179+1;
                        post.nro=n179
                        ceunta179.push(post);
                      }else{
                        if(post.cuenta == 180){
                          n180=n180+1;
                          post.nro=n180
                          ceunta180.push(post);
                        }else{
                          if(post.cuenta == 181){
                            n181=n181+1;
                            post.nro=n181
                            ceunta181.push(post);
                          }else{
                            if(post.cuenta == 182){
                              n182=n182+1;
                              post.nro=n182
                              ceunta182.push(post);
                            }else{
                              if(post.cuenta == 183){
                                n183=n183+1;
                                post.nro=n183
                                ceunta183.push(post);
                              }else{
                                if(post.uenta == 184){
                                  n184=n184+1;
                                  post.nro=n184
                                  ceunta184.push(post);
                                }else{
                                  if(post.cuenta == 185){
                                    n185=n185+1;
                                    post.nro=n185
                                    ceunta185.push(post);
                                  }else{
                                    if(post.cuenta == 186){
                                      n186=n186+1;
                                      post.nro=n186
                                      ceunta186.push(post);
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    this.ceunta171.data=ceunta171;
    this.ceunta172.data=ceunta172;
    this.ceunta173.data=ceunta173;
    this.ceunta174.data=ceunta174;
    this.ceunta175.data=ceunta175;
    this.ceunta176.data=ceunta176;
    this.ceunta177.data=ceunta177;
    this.ceunta178.data=ceunta178;
    this.ceunta179.data=ceunta179;
    this.ceunta180.data=ceunta180;
    this.ceunta181.data=ceunta181;
    this.ceunta182.data=ceunta182;
    this.ceunta183.data=ceunta183;
    this.ceunta184.data=ceunta184;
    this.ceunta185.data=ceunta185;
    this.ceunta186.data=ceunta186;
    this.etiquetas=etiquetaData
  }


  //---------tabla para la parte de etiquetas
  meses =[
    {num: "01", mes:"Jan"},
    {num: "02", mes:"Feb"},
    {num: "03", mes:"Mar"},
    {num: "04", mes:"Apr"},
    {num: "05", mes:"May"},
    {num: "06", mes:"Jun"},
    {num: "07", mes:"Jul"},
    {num: "08", mes:"Aug"},
    {num: "09", mes:"Sep"},
    {num: "10", mes:"Oct"},
    {num: "11", mes:"Nov"},
    {num: "12", mes:"Dec"}
  ]
  parse(date){
    const dat=date.toString()
    if ((typeof dat === 'string') && (dat.indexOf(' ') > -1)) {
      const str = dat.split(' ');
      const year : String=str[3];
      var month : String="";
      var day: String=str[2];
      for(const post of this.meses){
        if(post.mes == str[1]){ 
          month=post.num
          const aa=day+'-'+month+'-'+year
          this.fechaactual=aa;
        }
      }
    }else{console.log('no entro al parse')}
  }
  fecha=new Date()
  fechaactual='';
  async exportPDF(data){
    console.log('fecha',this.fecha)
    const pdfMake = new PdfMakeWrapper();
    pdfMake.add( new Txt('Generador de Etiquetas').fontSize(14).alignment('center').italics().bold().end)
    pdfMake.ln(1)
    pdfMake.add(
      new Table([
        [ 'Etiqueta', 'Descripcion'],
        ...this.extractDataEtiq(data),
      ]).alignment('justify').fontSize(9).layout("noBorders").end
    )
    pdfMake.create().open();
  }
  extractDataEtiq(data){
    return data.map(row => [row.etiqueta, row.descripcion]);
  }

  // ------------------- tabla de reposrte-----
  createTable(data: any){
    [{}]
    return new Table([
      ['Nro','Codigo', 'Sec.', 'Func.', 'Nombre', 'Descripcion', 'Estado', 'Verificar'],
      //[1,1, 'Hola', true],
      ...this.extractData(data),
    ])
    .fontSize(10)
    .alignment('justify')
    .heights(rowIndex =>{
      return rowIndex === 0 ? 20 : 0;
    })
    .layout({
      fillColor:(rowIndex: number, node: any, columnIndex: number)=>{
        return rowIndex === 0 ? '#CCCCCC': '';
      },
    })
    .end;
  }
  extractData(data){
    return data.map(row => [row.nro,row.codigo, row.seccion, row.funcionario, row.nombre_tipo, row.descripcion, row.estado, row.verificar]);
  }

  //
  async exportPDFs(tipo ?){
    this.parse(this.fecha);
    const pdfMake = new PdfMakeWrapper(); 
    pdfMake.pageSize('A4')

    if(!tipo){
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(1),
                await new Img(this.logoDataUrl).fit([100,100]).build(),
                new Txt('Cooperativa de Ahorro y Credito Societaria').bold().italics().alignment("center").fontSize(6).end,
                new Txt('SAN MARTIN R.L.').bold().italics().alignment("center").fontSize(6).end,
              ]).type('none').width(100).alignment('center').end,
              new Ul([
                new Txt('ACTA DE ENTREGA Y RECEPCION DE ACTIVOS').bold().italics().alignment("center").fontSize(14).end,
                pdfMake.ln(1),
                new Txt('En la ciudad de Potosi en fecha '+this.fechaactual+' se procede a realizar la entrega de los activos fijos pertenecientes a la Cooperativa de Ahorro y Credito Societaria San Martin R.L. para tal efecto interviene, el señor ______________________________ responsable de Activos Fijos, quien otorga los activos fijos al señor(a) ________________________ para que desde la fecha tenga custodia y asuma como actual responsable.').alignment("justify").fontSize(11).height(30).end,
                new Txt('A continuacion se da comienzo a la verificacion fisica de los materiales y equipos segun el siguiente detalle:').alignment("left").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout('noBorders')
      .widths([90,410])
      .end
      )
    }
    if(tipo && tipo=='sec'){
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(1),
                await new Img(this.logoDataUrl).fit([100,100]).build(),
                new Txt('Cooperativa de Ahorro y Credito Societaria '+ this.tipo).bold().italics().alignment("center").fontSize(6).end,
                new Txt('SAN MARTIN R.L.').bold().italics().alignment("center").fontSize(6).end,
              ]).type('none').width(100).alignment('center').end,
              new Ul([
                new Txt('REPORTE DE ACTIVOS FIJOS SEGUN EL AREA').bold().italics().alignment("center").fontSize(14).end,
                pdfMake.ln(1),
                new Txt('En la ciudad de Potosi en fecha '+this.fechaactual+' se procede a realizar un listado de los activos fijos de la Cooperativa de Ahorro y Credito Societaria San Martin R.L. del area de "'+ this.tipo +'" para tal efecto interviene, el Responsable de Activos Fijos.').alignment("justify").fontSize(11).height(30).end,
                new Txt('A continuacion se da comienzo a la lista fisica de los Activos Fijos segun el siguiente detalle:').alignment("left").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout('noBorders')
      .widths([90,410])
      .end
      )
    }
    if(tipo && tipo=='func'){
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(1),
                await new Img(this.logoDataUrl).fit([100,100]).build(),
                new Txt('Cooperativa de Ahorro y Credito Societaria').bold().italics().alignment("center").fontSize(6).end,
                new Txt('SAN MARTIN R.L.').bold().italics().alignment("center").fontSize(6).end,
              ]).type('none').width(100).alignment('center').end,
              new Ul([
                new Txt('REPORTE DE ACTIVOS FIJOS POR RESPONSABLE O ENCARGADO '+this.tipo).bold().italics().alignment("center").fontSize(14).end,
                pdfMake.ln(1),
                new Txt('En la ciudad de Potosi en fecha '+this.fechaactual+' se procede a realizar un listado de los activos fijos de la Cooperativa de Ahorro y Credito Societaria San Martin R.L. del Funcionario "'+ this.tipo +'" para tal efecto interviene, el Responsable de Activos Fijos.').alignment("justify").fontSize(11).height(30).end,
                new Txt('A continuacion se da comienzo a la lista fisica de los Activos Fijos segun el siguiente detalle:').alignment("left").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout('noBorders')
      .widths([90,410])
      .end
      )
    }
    if(tipo && tipo=='cuenta'){
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(1),
                await new Img(this.logoDataUrl).fit([100,100]).build(),
                new Txt('Cooperativa de Ahorro y Credito Societaria').bold().italics().alignment("center").fontSize(6).end,
                new Txt('SAN MARTIN R.L.').bold().italics().alignment("center").fontSize(6).end,
              ]).type('none').width(100).alignment('center').end,
              new Ul([
                new Txt('REPORTE DE ACTIVOS FIJOS POR TIPO DE CUENTA '+ this.tipo).bold().italics().alignment("center").fontSize(14).end,
                pdfMake.ln(1),
                new Txt('En la ciudad de Potosi en fecha '+this.fechaactual+' se procede a realizar un listado de los activos fijos de la Cooperativa de Ahorro y Credito Societaria San Martin R.L. del Tipo de Cuneta Nro. "'+ this.tipo +'" para tal efecto interviene, el Responsable de Activos Fijos.').alignment("justify").fontSize(11).height(30).end,
                new Txt('A continuacion se da comienzo a la lista fisica de los Activos Fijos segun el siguiente detalle:').alignment("left").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout('noBorders')
      .widths([90,410])
      .end
      )
    }

    if(tipo && tipo=='ope' && this.tipo == 'Operativo'){
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(1),
                await new Img(this.logoDataUrl).fit([100,100]).build(),
                new Txt('Cooperativa de Ahorro y Credito Societaria').bold().italics().alignment("center").fontSize(6).end,
                new Txt('SAN MARTIN R.L.').bold().italics().alignment("center").fontSize(6).end,
              ]).type('none').width(100).alignment('center').end,
              new Ul([
                new Txt('REPORTE DE ACTIVOS FIJOS DE ALTAS "'+ this.tipo+'"').bold().italics().alignment("center").fontSize(14).end,
                pdfMake.ln(1),
                new Txt('En la ciudad de Potosi en fecha '+this.fechaactual+' se procede a realizar un listado de los activos fijos de la Cooperativa de Ahorro y Credito Societaria San Martin R.L. de Altas  "'+ this.tipo +'" para tal efecto interviene, el Responsable de Activos Fijos.').alignment("justify").fontSize(11).height(30).end,
                new Txt('A continuacion se da comienzo a la lista fisica de los Activos Fijos segun el siguiente detalle:').alignment("left").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout('noBorders')
      .widths([90,410])
      .end
      )
    }

    if(tipo && tipo=='ope' && this.tipo == 'No Operativo'){
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(1),
                await new Img(this.logoDataUrl).fit([100,100]).build(),
                new Txt('Cooperativa de Ahorro y Credito Societaria').bold().italics().alignment("center").fontSize(6).end,
                new Txt('SAN MARTIN R.L.').bold().italics().alignment("center").fontSize(6).end,
              ]).type('none').width(100).alignment('center').end,
              new Ul([
                new Txt('REPORTE DE ACTIVOS FIJOS DE Bajas "'+ this.tipo+'"').bold().italics().alignment("center").fontSize(14).end,
                pdfMake.ln(1),
                new Txt('En la ciudad de Potosi en fecha '+this.fechaactual+' se procede a realizar un listado de los activos fijos de la Cooperativa de Ahorro y Credito Societaria San Martin R.L. de Bajas  "'+ this.tipo +'" para tal efecto interviene, el Responsable de Activos Fijos.').alignment("justify").fontSize(11).height(30).end,
                new Txt('A continuacion se da comienzo a la lista fisica de los Activos Fijos segun el siguiente detalle:').alignment("left").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout('noBorders')
      .widths([90,410])
      .end
      )
    }
    

    if(this.ceunta173.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Mobiliario y Enseres __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta173.data))
    }

    if(this.ceunta174.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Equipos e Instalacion __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta174.data))
    }
    if(this.ceunta175.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Equipos de Computacion __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta175.data))
    }
    if(this.ceunta176.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Vehiculos __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta176.data))
    }
    if(this.ceunta172.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Edificios __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta172.data))
    }
    if(this.ceunta171.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Terrenos __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta171.data))
    }
    if(this.ceunta177.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Obras de Arte __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta177.data))
    }
    if(this.ceunta178.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Vienes Tomados en Arrendamientos __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta178.data))
    }
    if(this.ceunta179.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Obras de Construccion __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta179.data))
    }
    if(this.ceunta180.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Otros Activos __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta180.data))
    }
    if(this.ceunta181.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Vienes Diversos __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta181.data))
    }
    if(this.ceunta182.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Cargos Diferidos __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta182.data))
    }
    if(this.ceunta183.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Partidas Pendientes __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta183.data))
    }
    if(this.ceunta184.data.length != 0){
      pdfMake.add(
        new Ul([
          new Txt('Activos Fijos').fontSize(10).color('#fff').end,
          new Txt('__________ Activos Intangibles __________').bold().italics().alignment("center").fontSize(16).background('#CCCCCC').width(400).end,
        ]).type('none').width(500).alignment('center').end,
      )
      pdfMake.add(this.createTable(this.ceunta184.data))
    }
    pdfMake.add(
      pdfMake.ln(2)
    );

    if(!tipo){
      pdfMake.add(new Txt('El funcionario que escribe como Custodio de Bienes, declara conocerlas siguientes disposicines institucionales, con la cual se compromete a respetarlas y aplicarlas durante todo su desempeño, dentro o fuera de las dependencias de la Cooperativa de Ahorro y Credito San Martin R.L.:').alignment('justify').fontSize(10).italics().end);
      pdfMake.add(pdfMake.ln(1))
      pdfMake.add(new Txt('1) Sera responsable del uso y resguardo de todos los vienes detallados y asignados en su seccion Personal.').alignment('justify').fontSize(10).italics().end);
      pdfMake.add(new Txt('2) Cuidara que estos Bienes esten destinados exclivamente para fines institucionales.').alignment('justify').fontSize(10).italics().end);
      pdfMake.add(new Txt('3) Adoptara todas las medidas posibles para que estos Bienes no esten expuestos a situaciones de deterioro, daño, robo o hurto.').alignment('justify').fontSize(10).italics().end);
      pdfMake.add(new Txt('4) Velara porque estos Bienes no sean sometidos a usos inadecuados o negligentes que deriven en su perdida o destruccion, ya que, imediatamente, tendra que restituir a la Cooperativa de Ahorro y Credito San Martin Ltda. el valor total de los Bienes afectados.').alignment('justify').fontSize(10).italics().end);
      pdfMake.add(new Txt('5) Solicitara, oportunamente, el mantenimiento preventivo de estos Bienes cada vez que fuera necesario (Muebles y Enseres, Equipos de Computacion o Instalacion).').alignment('justify').fontSize(10).italics().end);
      pdfMake.add(new Txt('6) Asimismo, antes de reasignar o cambiar de ubicacion fisica estos Bienes, Solicitara autorizacion a la Seccion encargada de Activo Fijo, mediante los formularios explicados en el Manual de Procedimientos de esta Seccion.').alignment('justify').fontSize(10).italics().end);
      pdfMake.add(pdfMake.ln(1))
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(3),
                new Txt('..........................................................................................').bold().italics().alignment("center").fontSize(5).end,
                new Txt('Responsable de verificacion de Entrgea').bold().italics().alignment("center").fontSize(10).end,
              ]).type('none').width(100).alignment('justify').end,
              new Ul([
                new Txt('Observaciones:').bold().italics().alignment("justify").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout({
        fillColor:(rowIndex: number, node: any, columnIndex: number)=>{
          return rowIndex === 0 ? '#fff': '';
        },
      }).widths([140,360]).end
      )
      
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(3),
                new Txt('..........................................................................................').bold().italics().alignment("center").fontSize(5).end,
                new Txt('Responsable de verificacion de Recepción').bold().italics().alignment("center").fontSize(10).end,
              ]).type('none').width(100).alignment('justify').end,
              new Ul([
                new Txt('Observaciones:').bold().italics().alignment("justify").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout({
        fillColor:(rowIndex: number, node: any, columnIndex: number)=>{
          return rowIndex === 0 ? '#fff': '';
        },
      }).widths([140,360]).end
      )
      pdfMake.add(
        new Table([
          [
              new Ul([
                pdfMake.ln(3),
                new Txt('..........................................................................................').bold().italics().alignment("center").fontSize(5).end,
                new Txt('Vo. Bo. Gerencia').bold().italics().alignment("center").fontSize(10).end,
              ]).type('none').width(100).alignment('justify').end,
              new Ul([
                new Txt('Observaciones:').bold().italics().alignment("justify").fontSize(11).end,
              ]).type('none').end
          ]
      ])
      .layout({
        fillColor:(rowIndex: number, node: any, columnIndex: number)=>{
          return rowIndex === 0 ? '#fff': '';
        },
      }).widths([140,360]).end
      )
    }

    pdfMake.create().open();
  }
}
/*
  //pdfMake.add(logo)
    //pdfMake.add( await new Img(this.logoDataUrl).build() );
 
    // base64

    //pdfMake.add( await new Img('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8UVgEf97liDcQ0-iUkCAPW8W3kQ_LRmBaIg&usqp=CAU').build() );
    //pdfMake.add( await new Img('../../ImgActivos/login_logo_glpi.png').build() );
    //pdfMake.add(await new Img('../../ImgActivos/login_logo_glpi.png',true).build());

//pdfMake.pageMargins([ 40, 60, 40, 60 ]);
    const logo=await new Img(this.logoDataUrl).build()
    pdfMake.add( await new Img(this.logosanmartin).build() );

    //const data = await this.fechData();
    
    //const img= new Img ('../../ImgActivos/login_logo_glpi.png')
    const letra=new Txt('hola mundo').bold().end
    const aa=new Columns([ logo, 'el titulo del activo ira aquikjahsfovhawrhvwbrpbrvbpqeiwurbvpiquwebmvbqwjaduipweb,vufcpwbviwqepcjlnluiewtobvwuoieibfvbewlur,ibgvuweirmbviwebv' ]).end
    const bb=new Columns([ 'Hello2', 'world' ]).columnGap(10).end
    //const cc=new Columns([ 'Hello3', 'world' ]).columnGap(10).bold()
    
    pdfMake.add(letra)
    //pdfMake.add(bb)
    pdfMake.add(new Ul([
      new Item(
        await new Img(this.logoDataUrl).build()
      ).listType('Img').end,
   
      new Item(
          new Txt('Item 2').bold().end
      ).listType('square').end,
    ]).end)
    pdfMake.add(new Ol([
      new Item(
        await new Img(this.logoDataUrl).build()
      ).listType('Img').end,
   
      new Item(
          new Txt('Item 2').bold().end
      ).end,
    ]).end)

    pdfMake.add( new Ul([
      'item 1',
      'item 2'
    ]).end
    )
    pdfMake.add( new Ul([
      'item 1',
      'item 2'
  ]).type('none').end
    )
    pdfMake.add( new Ol([
      'item 1',
      'item 2'
  ]).end
    )
    pdfMake.add( new Ol([
      'item 1',
      'item 2'
    ]).type('none').end
    )


https://www.google.com/search?q=cooperativa+de+ahorro+y+credito+san+martin+srl+potosi+logo&tbm=isch&ved=2ahUKEwjR0p3jlL3tAhVdBrkGHTqbAgEQ2-cCegQIABAA&oq=cooperativa+de+ahorro+y+credito+san+martin+srl+potosi+logo&gs_lcp=CgNpbWcQA1CdiQFYtpEBYIadAWgAcAB4AIABbYgBgQSSAQMyLjOYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=Uc3OX5HmGN2M5OUPuraKCA&bih=663&biw=1343&rlz=1C1CHBF_esBO875BO875&hl=es#imgrc=r5qS2wRV5hXeAM
https://saidbolivia.com.bo/img/sanmartin.png

https://www.google.com/url?sa=i&url=http%3A%2F%2Fsaidbolivia.com.bo%2Fclientes.php&psig=AOvVaw1jwA5CjQGy0JVMaNKGut5t&ust=1607474919728000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPj90_OUve0CFQAAAAAdAAAAABAE
columns: [
        {
            title: 'Person name',
            defaultContent: '', // if no content set in field
            data: 'name'
        },
        {
            title: 'Person age',
            type: 'num', // this would be a number field
            data: 'age'
        }
    ],
    data: [
        {name: 'John Doe', age: 25},
        {name: 'Michael Jackson', age: 30},
        {name: 'Tom Jones', age: 32},
        {name: 'Monica Beluchi', age: 34}
    ]
    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8UVgEf97liDcQ0-iUkCAPW8W3kQ_LRmBaIg&usqp=CAU
    https://www.google.com/imgres?imgurl=http%3A%2F%2Fsaidbolivia.com.bo%2Fimg%2Fsanmartin.png&imgrefurl=http%3A%2F%2Fsaidbolivia.com.bo%2Fclientes.php&tbnid=r5qS2wRV5hXeAM&vet=12ahUKEwiumrCbsL3tAhUkBLkGHef-BIkQMygzegQIARAu..i&docid=JRTbnaeHckQqSM&w=924&h=161&q=cooperativa%20de%20ahorro%20y%20credito%20san%20martin%20srl%20potosi%20logo&hl=es&ved=2ahUKEwiumrCbsL3tAhUkBLkGHef-BIkQMygzegQIARAu
*/