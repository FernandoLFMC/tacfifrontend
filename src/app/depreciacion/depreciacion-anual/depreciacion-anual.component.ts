import { Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import { ActivoService } from '../../service/activo.service';
import { AuthService } from '../../service/auth.service';
import { ExportxlsxService } from '../../service/exportxlsx.service';
import { PdfMakeWrapper, Txt, Img, Canvas, Polyline, Table, Columns, Ul, Ol, Item, Cell } from 'pdfmake-wrapper';


@Component({
  selector: 'app-depreciacion-anual',
  templateUrl: './depreciacion-anual.component.html',
  styleUrls: ['./depreciacion-anual.component.css']
})
export class DepreciacionAnualComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public authService: AuthService,
    private excelService: ExportxlsxService,
    private activoService: ActivoService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  dataSource = new MatTableDataSource();
  dataSources = new MatTableDataSource();

  displayedColumns: string[] = ['codigo','area','nombre_tipo','descripcion','vida_util','sujeto_depreciacion',
  'fecha_adqui','fecha_inicio','fecha_vencimiento','meses_transcurridos','meses_faltantes',
  'precio_inicial','valor_anterior','depreciacion_mensual','gasto_al','valor_acumulado','valor_neto'];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.activoService.getactivo()
    .subscribe(
      res => {
        this.dataSources.data=res
        console.log('res servicio acti', res)
      },
      err=>{
        console.log(err)
        if(err.status == 401){
          this.authService.logoutUser()
        }
      }
    )
  }

  meses =[
    {num: 1, mes:"Jan", day:"31", mesantes:12, dayantes:"31"},
    {num: 2, mes:"Feb", day:"28", mesantes:1, dayantes:"31"},
    {num: 3, mes:"Mar", day:"31", mesantes:2, dayantes:"28"},
    {num: 4, mes:"Apr", day:"30", mesantes:3, dayantes:"31"},
    {num: 5, mes:"May", day:"31", mesantes:4, dayantes:"30"},
    {num: 6, mes:"Jun", day:"30", mesantes:5, dayantes:"31"},
    {num: 7, mes:"Jul", day:"31", mesantes:6, dayantes:"30"},
    {num: 8, mes:"Aug", day:"31", mesantes:7, dayantes:"31"},
    {num: 9, mes:"Sep", day:"30", mesantes:8, dayantes:"31"},
    {num: 10, mes:"Oct", day:"31", mesantes:9, dayantes:"30"},
    {num: 11, mes:"Nov", day:"30", mesantes:10, dayantes:"31"},
    {num: 12, mes:"Dec", day:"31", mesantes:11, dayantes:"30"}
  ]

  parse(){
    const dat=this.date.toString()
    if ((typeof dat === 'string') && (dat.indexOf(' ') > -1)) {
      const str = dat.split(' ');
      this.fechacalcular.year=Number(str[3])
      const year : String=str[3];
      var month : number=0;
      var dayfin: String="";
      for(const post of this.meses){
        if(post.mes == str[1]){ 
          month = post.num;
          const aa = +post.num<10?'0'+post.num:post.num;
          this.fechacalcular.month=post.num
          dayfin=post.day
          this.fecha=year+'-'+aa+'-'+dayfin
        }
      }
      const day : string=str[2];
    }else{console.log('no entro al parse')}
  }

  date= Date();
  fecha="";
  fechacalcular={
    year:0,
    month:0,
    day:0
  }
  depresiacion=[]
  calculoDepre(value){
    const resultdepre=[]
    this.parse()
    for(const post of value){
      if(post.adquisicion_activo.costo_adquisicion){
        var yearinit=0
        var monthinit=0
        var dayinit=0
        var dayvencimiento="";
        var mesvencimiento=0;
        var añovencimiento=0;
        const resdepre={
          id_activo:0,
          codigo:"",
          area:"",
          nombre_tipo:"",
          descripcion:"",
          vida_util:"",
          sujeto_depreciacion:"",
          fecha_adqui:"",
          fecha_inicio:"",
          fecha_vencimiento:"",
          meses_transcurridos:0,
          meses_faltantes:0,
          precio_inicial:0,
          valor_anterior:0,
          depreciacion_mensual:0,
          gasto_al:0,
          valor_acumulado:0,
          valor_neto:0
        }
        resdepre.id_activo=post.id_activo;
        resdepre.codigo=post.id_cuenta+'-'+post.id_coop+'-'+post.cod_tipo;
        resdepre.area=post.cod_seccion+'-'+post.id_funcionario;
        resdepre.nombre_tipo=post.nombre_tipo;
        resdepre.vida_util=post.vida_util;
        resdepre.sujeto_depreciacion=post.sujeto_depreciacion;
        resdepre.fecha_adqui=post.adquisicion_activo.fecha_adquisicion;
        resdepre.precio_inicial=post.adquisicion_activo.costo_adquisicion;
        if(post.id_cuenta==173){
          resdepre.descripcion='Color: '+post.mobiliarioenseres.color+', '+' Material: '+post.mobiliarioenseres.material+' Descripcion: '+post.descripcion;
        }else{
          if(post.id_cuenta==171){
            resdepre.descripcion='Ciudad: '+post.terrenos.ciudad+', '+' Cod. Catastro: '+post.terrenos.cod_catastro+', '+' Departamento: '+post.terrenos.departamento
            +', '+' Direccion: '+post.terrenos.direccion+', '+' Matricula DDRR: '+post.terrenos.matricula_ddrr+', '+' Propietario: '+post.terrenos.propietario
            +', '+' Superficie: '+post.terrenos.superficie+', '+' Descripcion: '+post.descripcion;
          }else{
            if(post.id_cuenta==172){
              resdepre.descripcion='Ciudad: '+post.edificios.ciudad+', '+' Cod. Catastro: '+post.edificios.cod_catastro+', '+' Departamento: '+post.edificios.departamento
              +', '+' Direccion: '+post.edificios.direccion+', '+' Matricula DDRR: '+post.edificios.matricula_ddrr+', '+' Propietario: '+post.edificios.propietario
              +', '+' Superficie: '+post.edificios.superficie+', '+' Descripcion: '+post.descripcion;
            }else{
              if(post.id_cuenta==174){
                resdepre.descripcion='Color: '+post.equiposinstalacion.color +', '+' Industria: '+post.equiposinstalacion.industria+', '+' Marca: '+post.equiposinstalacion.marca
                +', '+' Modelo: '+post.equiposinstalacion.modelo+', '+' Nro. Serie: '+post.equiposinstalacion.nro_serial+', '+' Tipo: '+post.equiposinstalacion.tipo+', '+' descripcion: '+post.descripcion;
              }else{
                if(post.id_cuenta==175){
                  resdepre.descripcion='Color: '+ post.equiposcomputacion.color +', '+' Industria: '+ post.equiposcomputacion.industria+', '+' Marca: '+post.equiposcomputacion.marca
                  +', '+' Nro. Serie: '+post.equiposcomputacion.nro_serial+', '+' Tipo: '+post.equiposcomputacion.tipo+', '+' Descripcion: '+post.descripcion;
                }else{
                  if(post.id_cuenta==176){
                    resdepre.descripcion='Color: '+post.vehiculos.color +', '+' Marca: '+post.vehiculos.marca+', '+' Modelo: '+post.vehiculos.modelo+', '+' Nro. placa: '+post.vehiculos.nro_placa+', '+' Nro. chasis: '+post.vehiculos.nro_chasis
                    +', '+' Nro. motor: '+post.vehiculos.nro_motor+', '+' Ruat: '+post.vehiculos.ruat+', '+' Tipo: '+post.vehiculos.tipo+', '+' Descripcion: '+post.descripcion;
                  }else{
                    resdepre.descripcion=post.descripcion;
                  }
                }
              }
            }
          }
        }
        if(post.id_cuenta == 171 || post.sujeto_depreciacion == "No" || !post.vida_util || !post.adquisicion_activo.fecha_adquisicion){
          resdepre.valor_neto=post.adquisicion_activo.costo_adquisicion
        }else{
          //Calculo de fecha de adquisicion
          if ((typeof post.adquisicion_activo.fecha_adquisicion === 'string') && (post.adquisicion_activo.fecha_adquisicion.indexOf('-') > -1)) {
            const str = post.adquisicion_activo.fecha_adquisicion.split('-');
            yearinit = Number(str[0]);
            monthinit = Number(str[1]);
            dayinit = Number(str[2]);
          }
          //fecha inicial de activo
          for(const post of this.meses){
            if(post.num == monthinit){
              if(post.num > 1){
                añovencimiento=yearinit
                dayvencimiento=post.dayantes
                mesvencimiento=post.mesantes
                const aa= +mesvencimiento < 10 ? '0'+mesvencimiento:mesvencimiento;
                resdepre.fecha_inicio=yearinit+'-'+aa+'-'+post.dayantes
              }else{
                añovencimiento=yearinit-1
                dayvencimiento=post.dayantes
                mesvencimiento=post.mesantes
                const aa= +mesvencimiento < 10 ? '0'+mesvencimiento:mesvencimiento;
                resdepre.fecha_inicio=añovencimiento+'-'+aa+'-'+post.dayantes
              }
            }
          }

          //fecha de vencimiento
          var años=(añovencimiento+(post.vida_util/12));
          const aa= +mesvencimiento < 10 ? '0'+mesvencimiento:mesvencimiento;
          resdepre.fecha_vencimiento=años+'-'+aa+'-'+dayvencimiento
          
          //calculo de los meses transcurridos
          var contador = 0
          var conta=0
          var vueltas = mesvencimiento
          var añorecorre=añovencimiento
          if(añorecorre > this.fechacalcular.year){
            console.log('fechas incorrecta ')
          }else{
            if(añorecorre == this.fechacalcular.year){
              conta = 12-mesvencimiento
            }else{
              var bbb =this.fechacalcular.year - añorecorre
              var ccc = bbb*12
              var ddd = 12 - mesvencimiento
              conta = ccc + ddd
              
            }
          }
          resdepre.meses_transcurridos=conta
          var mes_falta=post.vida_util-resdepre.meses_transcurridos
          if(mes_falta <= 0){
            resdepre.meses_faltantes=0
            resdepre.depreciacion_mensual=0
          }else{
            resdepre.meses_faltantes=mes_falta
          }

          //calculo de de los 
          resdepre.valor_anterior=post.adquisicion_activo.costo_adquisicion - 1;
          if(this.fechacalcular.year >= añovencimiento){
            resdepre.depreciacion_mensual=(post.adquisicion_activo.costo_adquisicion)/post.vida_util;
            resdepre.depreciacion_mensual=Math.round(resdepre.depreciacion_mensual*100)/100;
            const precio=((resdepre.valor_anterior/post.vida_util)*resdepre.meses_faltantes);
            resdepre.gasto_al=Math.round(precio*100)/100;
            resdepre.valor_acumulado=(post.adquisicion_activo.costo_adquisicion-1)-resdepre.gasto_al;
            resdepre.valor_acumulado=Math.round(resdepre.valor_acumulado*100)/100;
          }
          var a=post.adquisicion_activo.costo_adquisicion - resdepre.valor_acumulado;
          resdepre.valor_neto=Math.round(a*100)/100;
        }

        //subir calculos a lista depreciacion
        resultdepre.push(resdepre);
      }
      
    }
    this.dataSource.data=resultdepre
  }
  

  exportExcel(){
    this.excelService.exportToExcel(this.dataSource.data, 'my_export_depreciacion')
  }

  cargar_depre_anual(datos){
    if(this.dataSource.data){
      // enviamos this.dataSource.data al servidor iterativo para su registro
      //primero se tiene que ordenar
      //imprimir mensaje de cargado todo
    }else{
      //mensaje de que selecione activo
    }
  }

  exportPDF(){
    var depre_mes=0;
    var prec_inicial=0;
    var val_anterio=0;
    var val_acumlado=0;
    var val_neto=0;
    this.dataSource.data.forEach(function(elemento, indice) {
      if(elemento["depreciacion_mensual"]){
        depre_mes += elemento["depreciacion_mensual"];
      }
    });
    
    this.dataSource.data.forEach(function(elemento, indice) {
      prec_inicial += elemento["precio_inicial"];
    });
    this.dataSource.data.forEach(function(elemento, indice) {
      val_anterio += elemento["valor_anterior"];
    });
    this.dataSource.data.forEach(function(elemento, indice) {
      val_acumlado += elemento["valor_acumulado"];
    });
    this.dataSource.data.forEach(function(elemento, indice) {
      val_neto += elemento["valor_neto"];
    });
    const pdfMake = new PdfMakeWrapper();
    pdfMake.pageSize('A4')
    pdfMake.pageOrientation('landscape')
    pdfMake.add( new Txt('Depreciacion Anual a fecha '+ this.fecha).fontSize(16).alignment('center').italics().bold().end)
    pdfMake.ln(1)
    pdfMake.add(this.createTable(this.dataSource.data));
    pdfMake.add(pdfMake.ln(1))
    pdfMake.add( new Txt('Total Depreciacion Mensual = '+depre_mes).fontSize(12).alignment('justify').italics().bold().end)
    pdfMake.add(pdfMake.ln(1))
    pdfMake.add( new Txt('Total Precio Inicial = '+prec_inicial).fontSize(12).alignment('justify').italics().bold().end)
    pdfMake.add(pdfMake.ln(1))
    pdfMake.add( new Txt('Total Valor Anterior = '+val_anterio).fontSize(12).alignment('justify').italics().bold().end)
    pdfMake.add(pdfMake.ln(1))
    pdfMake.add( new Txt('Total Valor Acumulado = '+val_acumlado).fontSize(12).alignment('justify').italics().bold().end)
    pdfMake.add(pdfMake.ln(1))
    pdfMake.add( new Txt('Total Valor Neto = '+val_neto).fontSize(12).alignment('justify').italics().bold().end)
    pdfMake.create().open();
  }
  createTable(data: any){
    [{}]
    return new Table([
      ['Codigo', 'Area', 'Nomb. tipo', 'Descripcion', 'Vida util', 'Sujeto Depr..', 'Fecha Adquicicion','Fecha de inicio','Fecha vencimiento', 'Meses Trans..', 'Meses Faltantes','Precio Adqui..', 'Valor anterior', 'Depre.. mensual', 'gasto al '+this.fecha, 'Valor Acumulado', 'Valor Neto'],
      //[1,1, 'Hola', true],
      ...this.extractData(data),
    ])
    .fontSize(6)
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
    return data.map(row => [row.codigo, row.area, row.nombre_tipo, row.descripcion, row.vida_util,
       row.sujeto_depreciacion, row.fecha_adqui, row.fecha_inicio, row.fecha_vencimiento, row.meses_transcurridos
       , row.meses_faltantes, row.precio_inicial, row.valor_anterior, row.depreciacion_mensual, row.gasto_al
       , row.valor_acumulado, row.valor_neto]);
       
  }

}
