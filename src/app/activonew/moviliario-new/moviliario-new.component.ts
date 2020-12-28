import { Component, OnInit} from '@angular/core';
import { ActivoService } from '../../service/activo.service';
import { TaskService } from '../../service/task.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from '../../service/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-moviliario-new',
  templateUrl: './moviliario-new.component.html',
  styleUrls: ['./moviliario-new.component.css']
})
export class MoviliarioNewComponent implements OnInit {

  constructor(private activoservice:ActivoService,
    private taskservice: TaskService,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    private router: Router,
    private actirouter: ActivatedRoute) { }


    codigo=[]


    dataSource = []
  activo= this.fb.group({
    id_activo:[''],
    id_cuenta: [173,Validators.required],
    id_coop: ["",Validators.required],
    cod_tipo: ["",[Validators.required/*, Validators.min(2),Validators.max(77)*/]],
    cod_seccion: ["",Validators.required],
    id_funcionario: ["",Validators.required],
    nombre_tipo: ["",Validators.required],
    vida_util:[120,Validators.required],
    sujeto_depreciacion:["Si",Validators.required],
    descripcion: "",
    unidad: "Pza. 1",
    estado_op_nop: ["Operativo",Validators.required],
    observacion: "",
    imagen:""
  })

  private image : File;
  HandleImage(event:any):void{
    this.image = event.target.files[0];
    console.log(this.image)
    if(this.image.type.indexOf('image') < 0){
      Swal.fire('Error:', 'El archivo debe ser del tipo Imagen', 'error');
      this.image=null;
    }else{ if (this.image){
      this._snackBar.open('Se a Seleccionado correctamente la imagen ', this.image.name, {
        duration: 4000,});
    }
    }
  }


  getErrorMessage(field: string){
    let message;
    if(this.activo.get(field).errors.required){
      message = 'Requiere datos...';
    }else if (this.activo.get(field).hasError('minlength')){
      const minLength = this.activo.get(field).errors?.minlength.requiredLength;
      message = 'supera el max length aaa';
    }
    return message; 
  }
  isValidField(field: string): boolean {
    return ((this.activo.get(field).touched || this.activo.get(field).dirty) && 
    !this.activo.get(field).valid);
  }
  selected = new FormControl(0);
    siguiente (val){
      this.selected.setValue(val)
  }
  generar(){
    if(this.activo.value.nombre_tipo){
      for(const post of this.codigo){
        if(post.nombre == this.activo.value.nombre_tipo){
          var numb=post.num +1;
          const rango=post.num + 999;
          for(const post of this.dataSource){
            if(post.cod_tipo == numb && post.cod_tipo < rango){
              numb=numb+1;
            }else {if(post.cod_tipo >rango){break;}}
          }
          this.activo.patchValue({cod_tipo : numb})
          break;
        }
      }
    }else{ this._snackBar.open('Seleccione un Nombre de tipo de activo para generar', 'Codigo', {
      duration: 3000,});}
  }
  validador:0;
  comprobar(comp: number){
    let message;
    for(const post of this.dataSource){
      if(post.cod_tipo == comp){
        message = 'El codigo  ya existe';
        break
      }
    }
    if(this.activo.value.nombre_tipo){
      for(const post of this.codigo){
        if(post.nombre == this.activo.value.nombre_tipo){
          this.validador=post.num;
          const numb=post.num;
          const rango=post.num + 999;
          if(comp > rango || comp <= numb ){
            message= `Introdusca en el rango ${numb} --- ${rango}`
          }
          break
        }
      }
    }else{message="Seleccione Nombre de Tipo"}
    return message;
  }

  mobiliarioenseres= this.fb.group({
    id_activo: 0,
    material:["",Validators.required],
    color: ["",Validators.required]
  })
  getErrorMessages(field: string){
    let message;
    if(this.mobiliarioenseres.get(field).errors.required){
      message = 'Requiere datos...';
    }
    return message;
  }
  isValidFields(field: string): boolean {
    return ((this.mobiliarioenseres.get(field).touched || this.mobiliarioenseres.get(field).dirty) && 
    !this.mobiliarioenseres.get(field).valid);
  }

  adquisicion = this.fb.group({
    id_activo: 0,
    id_adquisicion: ["",Validators.required],
    nit: [null,Validators.required],//1020304050,
    fecha_adquisicion: [""/*,Validators.required*/],//2020-03-17
    comprobante_contable: [""/*,Validators.required*/],
    nro_factura:"",
    costo_adquisicion: [0,Validators.required]
  })
  getErrorMessagess(field: string){
    let message;
    if(this.adquisicion.get(field).errors.required){
      message = 'Requiere datos...';
    }
    return message;
  }
  isValidFieldss(field: string): boolean {
    return ((this.adquisicion.get(field).touched || this.adquisicion.get(field).dirty) && 
    !this.adquisicion.get(field).valid);
  }
  

  proveedor= this.fb.group({
    nit: ["",Validators.required],
    nombre_tienda: ["",Validators.required],
    direccion: ["",Validators.required],
    telefono:""
  })
  getErrorMessagesss(field: string){
    let message;
    if(this.proveedor.get(field).errors.required){
      message = 'Requiere datos...';
    }
    return message;
  }
  isValidFieldsss(field: string): boolean {
    return ((this.proveedor.get(field).touched || this.proveedor.get(field).dirty) && 
    !this.proveedor.get(field).valid);
  }
  
  createprov(value){
    var confirm=0
    for (const post of value){
      if(post.nit == this.proveedor.value.nit){
          this._snackBar.open('Existe el numero de Nit: ', post.nit, {
            duration: 3000,});
        confirm=1
        break
      }
    }
    if(confirm == 0 && this.proveedor.status == "VALID"){
      this.activoservice.createproveedor(this.proveedor.value)
      .subscribe(
        res=>{console.log(res)
          this.activoservice.getproveedor()
          .subscribe(
            res=>this.prov=res,
            err=>console.log(err)
          )
          this.adquisicion.patchValue({nit : res.nit})
          this.proveedor.reset()
          //this.adquisicion.nit=this.proveedor.nit
        },
        err=>{console.log(err)
                  Swal.fire('Error', 'No se creo proveedor por el Nro. de NIT', 'error')
        }
      )
    }
  }
  
  seccion:[]
  coop:[]
  funcionario:[]
  adqui:[]
  prov:[]
  
  id='';
  ngOnInit(): void {
    if (this.actirouter.snapshot.paramMap.get('id')){
      this.id=this.actirouter.snapshot.paramMap.get('id');
      this.activoservice.getidacti(this.id)
      .subscribe(
        res=>{console.log('res get id', res)
              this.activo.patchValue({id_activo : res.id_activo})
              this.activo.patchValue({id_cuenta : res.id_cuenta})
              this.activo.patchValue({id_coop : res.id_coop})
              this.activo.patchValue({cod_tipo : res.cod_tipo})
              this.activo.patchValue({nombre_tipo : res.nombre_tipo})
              this.activo.patchValue({cod_seccion : res.cod_seccion})
              this.activo.patchValue({id_funcionario : res.id_funcionario})
              this.activo.patchValue({descripcion : res.descripcion})
              this.activo.patchValue({unidad : res.unidad})
              this.activo.patchValue({estado_op_nop : res.estado_op_nop})
              this.activo.patchValue({observacion : res.observacion})
              this.activo.patchValue({vida_util : res.vida_util})
              this.activo.patchValue({sujeto_depreciacion : res.sujeto_depreciacion})
              //this.activo=res
              this.adquisicion.setValue(res.adquisicion_activo)
              //this.adquisicion=res.adquisicion_activo
              this.mobiliarioenseres.setValue(res.mobiliarioenseres)
              //para la fecha de edicion
              this.fechaedit=res.adquisicion_activo.fecha_adquisicion
            },
        err=>{console.log('err get id',err)}
      )
    }
    this.taskservice.getTask()
    .subscribe(
      res=>{res.sort(function (a, b) {return a.cod_seccion.localeCompare(b.cod_seccion);});
        this.seccion=res},
        err=> {console.log(err)
          if(err.status == 401){
            this.authService.logoutUser()
          }}
    )
    this.taskservice.listfuncionario()
    .subscribe(
      res=>{ res.sort(function (a, b) {return a.id_funcionario - b.id_funcionario;});
        this.funcionario=res},
      err=>console.log(err)
    )
    this.taskservice.listarcoop()
    .subscribe(
      res=>this.coop=res,
      err=>console.log(err)
    )
    this.taskservice.listadqui()
    .subscribe(
      res=>this.adqui=res,
        err=>console.log(err)
    )
    this.activoservice.getproveedor()
    .subscribe(
      res=>this.prov=res,
      err=>console.log(err)
    )
    this.taskservice.getTipocuenta()
    .subscribe(
      res=>{
        res.sort(function (a, b) {return a.num - b.num;});
        const resultPost = []
        for(const post of res){
          if(post.id_cuenta==this.activo.value.id_cuenta){
            resultPost.push(post);
          }
        }
        this.codigo=resultPost;
      },
      err=>{console.log('err tipo cuenta',err)}
    )
    this.activoservice.getIdActivo()
    .subscribe(
      res => {
        res.sort(function (a, b) {return a.cod_tipo - b.cod_tipo;});
        const resultPost = []
        for(const post of res){
          if (post.id_cuenta == this.activo.value.id_cuenta){
            resultPost.push(post);            }
          }
        this.dataSource= resultPost;
      },
      err=>{console.log('err id activo',err)}
    )
  }
  crear(){
    if(this.activo.status == "VALID"){
      if(this.activo.value.cod_tipo > this.validador && this.activo.value.cod_tipo <= this.validador+999){
        this.activoservice.createactivo(this.activo.value)
        .subscribe(
          res=>{console.log('res activo',res)
            if(this.image){
              this.activoservice.SubirImage(this.image, res.id_activo)
              .subscribe(
                res=>{console.log('res image', res)},
                err=>{console.log('err image', err)}
              )
            }
            this.adquisicion.patchValue({id_activo : res.id_activo})
            //this.adquisicion.id_activo=res.id_activo
            this.mobiliarioenseres.patchValue({id_activo : res.id_activo})
            //this.equipcompu.id_activo=res.id_activo
            if(this.adquisicion.status == "VALID"){
              if(this.adquisicion.value.fecha_adquisicion){
                this.parse(this.adquisicion.value.fecha_adquisicion)
              }
              console.log('manda adquiacti', this.adquisicion.value)
              this.activoservice.createAdquiActi(this.adquisicion.value)
              .subscribe(
                res=>{console.log('res AdquiActi', res)
                  if(this.mobiliarioenseres.status == "VALID"){
                    this.activoservice.createmobiliario(this.mobiliarioenseres.value)
                    .subscribe(
                      res=>{console.log('res computacion', res)
                      Swal.fire('Creado', 'Se creo corectamente', 'success')
                      this.router.navigate(['/listar-activo'])
                      },
                      err=>{console.log('err Instalacion', err)
                            Swal.fire('Error', 'No se creo Equipo de computacion', 'error')
                            this.delete(this.activo.value.id_activo)}
                    ) 
                  }else{this.delete(this.activo.value.id_activo)}          
                },
                err=>{console.log('err AdquiActi', err)
                      Swal.fire('Error', 'No se creo tipo de adquisicion', 'error')
                      this.delete(this.activo.value.id_activo)}
              )      
            }else{this.delete(this.activo.value.id_activo)} 
          },
          err=>{
            console.log('error',err)
            Swal.fire('Error', 'Error, el codigo de tipo existe', 'error')
          }
        )
      }else{Swal.fire('Error', 'El Codigo Tipo no corresponde al Nombre Tipo.. Verifique el Paso 1', 'error')}
    }else{this._snackBar.open('Complete todos los espacios', 'Activo', {
      duration: 3000,});}
  }
  
  edit(){
    if(this.activo.status == "VALID"){
    this.activoservice.putactivo(this.activo.value)
    .subscribe(
      res=>{console.log('res put acti',res)
      if(this.image){
        this.activoservice.SubirImage(this.image, res.id_activo)
        .subscribe(
          res=>{console.log('res image', res)},
          err=>{console.log('err image', err)}
        )
      }
      if(this.adquisicion.status == "VALID"){
        if(this.adquisicion.value.fecha_adquisicion==this.fechaedit){
        }else{
          if(this.adquisicion.value.fecha_adquisicion){
            this.parse(this.adquisicion.value.fecha_adquisicion)
          }
        }
        this.activoservice.putAdquiActi(this.adquisicion.value)
        .subscribe(
          res=>{console.log('resput adquiacti', res)
          if(this.mobiliarioenseres.status == "VALID"){
          this.activoservice.putMobiliario(this.mobiliarioenseres.value)
          .subscribe(
            res=>{console.log('resput adquiacti', res)
            Swal.fire('Editado', 'Se Edito corectamente', 'success')
            this.router.navigate(['/listar-activo'])  
          },
            err=>{console.log('err put adquiacti', err)
            Swal.fire('Error', 'No se a Editado--Verifique datos Paso 1', 'error')}
          )}
        },
        err=>{console.log('err put adquiacti', err)
          Swal.fire('Error', 'No se a Editado--Verifique datos Paso 2', 'error')}
        )}},
          err=>{console.log('error put acti', err)
          Swal.fire('Error', 'No se a Editado--Verifique datos Paso 1', 'error')}
        ) 
      }else { this._snackBar.open('Complete todos los espacios', 'activo', {
        duration: 3000,}); }
    } 
  
  delete(res){
    this.activoservice.deleteactivo(res)
      .subscribe(
      res=>{console.log(res)},
      err=>{console.log(err)}
    )
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
          this.adquisicion.patchValue({ fecha_adquisicion: aa})
        }
      }
    }else{console.log('no entro al parse')}
  }
}
