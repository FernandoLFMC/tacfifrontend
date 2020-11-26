import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'

import { ActivoService } from '../../service/activo.service'
import { Validators, FormBuilder, FormControl } from '@angular/forms';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  datos_entrada=[
    {
      fechainicial:"2020-01-15",
      precioinicial:1000,
      vida_util_meses:120
    },
    {
      fechainicial:"2020-07-16",
      precioinicial:1500,
      vida_util_meses:120
    },{
      fechainicial:"2020-07-17",
      precioinicial:2000,
      vida_util_meses:120
    },{
      fechainicial:"2020-01-18",
      precioinicial:500,
      vida_util_meses:120
    }
  ]


//Expected output should be: "1 year, 5 months".


//flecha: '2020-07-18';
activo= this.fb.group({
  fecha:["",Validators.required],
})



meses =[
  {num: 1, mes:"Jan", mesantes:12, dayantes:"31"},
  {num: 2, mes:"Feb", mesantes:1, dayantes:"31"},
  {num: 3, mes:"Mar", mesantes:2, dayantes:"28"},
  {num: 4, mes:"Apr", mesantes:3, dayantes:"31"},
  {num: 5, mes:"May", mesantes:4, dayantes:"30"},
  {num: 6, mes:"Jun", mesantes:5, dayantes:"31"},
  {num: 7, mes:"Jul", mesantes:6, dayantes:"30"},
  {num: 8, mes:"Aug", mesantes:7, dayantes:"31"},
  {num: 9, mes:"Sep", mesantes:8, dayantes:"31"},
  {num: 10, mes:"Oct", mesantes:9, dayantes:"30"},
  {num: 11, mes:"Nov", mesantes:10, dayantes:"31"},
  {num: 12, mes:"Dec", mesantes:11, dayantes:"30"}
]

date= Date()
fechacalcular={
  year:0,
  month:0,
  day:0

}
parse(){
  const dat=this.date.toString()
  if ((typeof dat === 'string') && (dat.indexOf(' ') > -1)) {
    const str = dat.split(' ');
    this.fechacalcular.year=Number(str[3])
    const year : String=str[3];
    var month : string="";
    for(const post of this.meses){
      const a =post.num.toString()
      if(post.mes == str[1]){ 
        month = post.num.toString();
      }
    }
    const day : string=str[2];
    const fecha =year+'-'+month+'-'+day
    
    console.log('esto es la fecha final', fecha)
    console.log('fechacalcular',this.fechacalcular)
  }else{console.log('no entro al parse')}
}


/*{
  fecha_inicio:"",
  fecha_vencimiento:"",
  meses_depre_al:""

}*/

/*{
  fechainicial:"2020-07-18",
  precioinicial:500,
  vida_util_meses:120
}*/
depresiacion=[]
calculoDepre(datos_entrada){
  const resultdepre=[]
  for(const post of datos_entrada){
    var yearinit=0
    var monthinit=0
    var dayinit=0
    var dayvencimiento="";
    var mesvencimiento=0;
    var añovencimiento=0
    const resdepre={
      fecha_adqui:"",
      fecha_inicio:"",
      fecha_vencimiento:"",
      meses_transcurridos:0,
      meses_faltantes:0,
      precio_inicial:0,
      volor_contavilizado:0
    }
    //fecha de adquisicion
    resdepre.fecha_adqui=post.fechainicial
    if ((typeof post.fechainicial === 'string') && (post.fechainicial.indexOf('-') > -1)) {
      const str = post.fechainicial.split('-');
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
          resdepre.fecha_inicio=yearinit+'-'+post.mesantes+'-'+post.dayantes
        }else{
          añovencimiento=yearinit-1
          dayvencimiento=post.dayantes
          mesvencimiento=post.mesantes
          resdepre.fecha_inicio=añovencimiento+'-'+post.mesantes+'-'+post.dayantes
        }
      }
    }
    //fecha de vencimiento
    var años=(añovencimiento+(post.vida_util_meses/12));
    resdepre.fecha_vencimiento=años+'-'+mesvencimiento+'-'+dayvencimiento
    //guardar iteracion para el resultado de deoresicion
    resultdepre.push(resdepre);

    //2020-05-15
    //2020-10-31
    var mesestranscurridos=0;
    console.log('año entra año entar', this.fechacalcular.year, añovencimiento)
    if(this.fechacalcular.year == añovencimiento){
      mesestranscurridos=12-mesvencimiento
      resdepre.meses_transcurridos=mesestranscurridos
    }else{if (this.fechacalcular.year > añovencimiento){
        const a=this.fechacalcular.year - añovencimiento
        const b=a * 12
        const c=12-mesvencimiento
        mesestranscurridos=b+c
        resdepre.meses_transcurridos=mesestranscurridos
        console.log('total meses año', mesestranscurridos)
      }
    }
    resdepre.meses_faltantes=post.vida_util_meses - mesestranscurridos

    //calculo de de los precios
    const precio=(((post.precioinicial-1)/post.vida_util_meses)*resdepre.meses_faltantes)
    resdepre.precio_inicial=post.precioinicial
    resdepre.volor_contavilizado=precio
  }
  this.depresiacion=resultdepre
}










/*var sdt = new Date('1972-11-30');
var difdt = new Date(new Date() - sdt);
alert((difdt.toISOString().slice(0, 4) - 1970) + "Y " + (difdt.getMonth()+1) + "M " + difdt.getDate() + "D");*/

/*const momentDate = new Date(event.value); // Replace event.value with your date value
const formattedDate = moment(momentDate).format("YYYY/MM/DD");
console.log(formattedDate);*/

date11 = '2011-05-01';
date22 = '2010-05-01';// remember this is equivalent to 06 01 2010
//dates in js are counted from 0, so 05 is 
result = ""

calcDate(date1,date2) {
  date1= new Date (this.date11)
  date2= new Date (this.date22)
  var fecha = new Date (date1.PAGE_UP)
  
  console.log('mes anterior',fecha)

       var diff = Math.floor(date1.getTime() - date2.getTime());
       var day = 1000 * 60 * 60 * 24;

       var days = Math.floor(diff/day);
       var months = Math.floor(days/31);
       var years = Math.floor(months/12);

       var message = date2.toDateString();
       message += " was "
       message += days + " days " 
       message += months + " months "
       message += years + " years ago \n"

       this.result= message
       return message
}


 //a=this.calcDate(this.today, this.past)

bbbb={
  numerito:56.06301,
  numer:45.0020001
}
aaaaa={
  numeritob:0
}
val=0
respues=0
respuesta=0
ver(){
  if(this.respues){
    this.respuesta=this.respues
  }else{
    console.log("no existe")
  }
}




  seccion: [ ];

  model:{}

  cuenta=171
   numero:number;
   nume:number
  num=(this.cuenta);

  constructor(private taskService: TaskService,
    private activoservice: ActivoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) { }

    selected = new FormControl(0);
    siguiente (val){
      console.log('ajshkj',this.selected.value)
      
      this.selected.setValue(val)
      console.log('aaaaaa',this.selected.value)
    }


  ngOnInit(): void {
    




    /*this.activoservice.getIdActivo()
    .subscribe(
      res=>{
        //this.activo=res
        console.log('id activo res',this.activo)
      },
      err=>console.log('err activo', err)
    )*/
    /*this.taskService.getTask()
    .subscribe(
      res=>{
        this.seccion=res
        console.log('respuesta',this.seccion)
      },
      err=>{
        console.log('error',err)
      }
    )*/
  }

  create(){
    console.log("date", this.model)
    /*var a = 1
    if(this.numero){
    for (var i = 0; i < this.activo.length; i++){
            a= a+1
    }}

    console.log('enviado create', this.selectedValue)
    console.log('nume',a)
      //console.log('codigo que se envia',this.selectedValue)
    this.taskService.createTask(this.createTask)
    .subscribe(
      res => {
        console.log(res)
        this.router.navigate(['/tasks'])
      },
      err => {
        console.log(err)
        if(err instanceof HttpErrorResponse){
         if(err.status === 401){
            this.snackBar.open("No estas logeado... Enviando a Login", null, {
               duration: 2000
            })
            this.router.navigate(['/login'])
          }
        }
      }
    )*/ 
  }

}



