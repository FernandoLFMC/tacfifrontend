import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { ActivoService } from '../../service/activo.service'
import { TaskService } from '../../service/task.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {

  constructor(private router: Router,
              private actirouter: ActivatedRoute,
              private activoservice: ActivoService,
              private _snackBar: MatSnackBar,
              private fb: FormBuilder,
              private taskservice: TaskService,
              public dialog: MatDialogRef<MovimientosComponent>,
              @Inject(MAT_DIALOG_DATA)public data: "") { }

  

  infoactivo= this.fb.group({
    id_activo:["",Validators.required],
    funcionario_anterior:["",Validators.required],
    seccion_anterior:["",Validators.required],
    fecha_movimiento:[Date,Validators.required],
    motivo:["",Validators.required],
    funcionario_actual:["",Validators.required],
    seccion_actual:["",Validators.required],
  })

  info_acti={
    id_activo:"",
    cod_seccion: "",
    id_funcionario: ""
  }

  id_cuenta: ""
  cod_tipo: ""

  seccion:[]
  funcionario:[]
  id_info_acti=""
  id=""
  ngOnInit(): void {
    //this.id=this.actirouter.snapshot.paramMap.get('id');
    //console.log('res de terrenos list', this.id)
    this.activoservice.getidacti(this.data)
    .subscribe(
      res=>{this.id_cuenta=res.id_cuenta
            this.info_acti.id_activo=res.id_activo
            this.cod_tipo=res.cod_tipo
            this.infoactivo.patchValue({id_activo : res.id_activo})
            //this.infoactivo.id_activo=res.id_activo
            this.infoactivo.patchValue({funcionario_anterior : res.id_funcionario})
            //this.infoactivo.funcionario_anterior=res.id_funcionario
            this.infoactivo.patchValue({seccion_anterior : res.cod_seccion})
            //this.infoactivo.seccion_anterior=res.cod_seccion
            },
      err=>console.log(err)
    )
    this.taskservice.getTask()
    .subscribe(
      res=>this.seccion=res,
        err=> console.log(err)
    )
    this.taskservice.listfuncionario()
    .subscribe(
      res=>this.funcionario=res,
      err=>console.log(err)
    )
  }

  crear(){
    if(this.infoactivo.status == "VALID"){
      this.parse(this.infoactivo.value.fecha_movimiento)
      this.info_acti.id_funcionario=this.infoactivo.value.funcionario_actual
      this.info_acti.cod_seccion= this.infoactivo.value.seccion_actual
      /*console.log('res crear', this.infoactivo)
      console.log('res crearrr', this.info_acti)*/
      this.activoservice.createinfo_acti(this.infoactivo.value)
      .subscribe(
        res=>{
          console.log('res crear', res)
          this.id_info_acti=res.id_info
          this.activoservice.updateinfoacti(this.info_acti)
          .subscribe(
            res=>{console.log('res crearrr', res)
            this._snackBar.open('Se movio correctamente', 'Correcto...', {
              duration: 3000,});
            },
            err=>{console.log('error crearrr',err)
                  this.activoservice.deleteinfo_acti(this.id_info_acti)
                  .subscribe(
                    res=>console.log('se elimino',res),
                    err=>console.log('no se elimino',err)
                  )}
          )
        },
        err=>{console.log('error service', err)}
      )
    }
  }
  fechaedit="";
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
          const aa=year+'-'+month+'-'+day
          this.infoactivo.patchValue({ fecha_movimiento: aa})
        }
      }
    }else{console.log('no entro al parse')}
  }
}