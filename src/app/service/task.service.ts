import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = "http://localhost:8080/api/v1/seccion"
  private cuentaUrl = "http://localhost:8080/api/v1/cuenta"
  private coopUrl = "http://localhost:8080/api/v1/cooperativa"
  private fucionarioUrl = "http://localhost:8080/api/v1/funcionario"
  private adquiUrl = "http://localhost:8080/api/v1/adquisicion"
  private profesionUrl="http://localhost:8080/api/v1/profesion"
  private tipocuentaUrl = "http://localhost:8080/api/v1/tipo_cuenta"

  constructor(private http: HttpClient) { }
  // Servicio para la parte de tipos de cuenta 
  createTipocuenta(tipocuenta){
    return this.http.post<any>(this.tipocuentaUrl, tipocuenta, httpOptions)
  }
  getTipocuenta(){
    return this.http.get<any>(this.tipocuentaUrl)
  }
  putTipocuenta(tipocuenta){
    const id=tipocuenta.id_num
    const url=`${this.tipocuentaUrl}/${id}`
    return this.http.put<any>(url, tipocuenta)
  }
  deleteTipocuenta(tipocuenta){
    const id=tipocuenta.id_num
    const url=`${this.tipocuentaUrl}/${id}`
    return this.http.delete<any>(url)
  }
//servicios para Seccion de activo
  createTask(task){
    return this.http.post<any>(this.taskUrl, task, httpOptions);
  }

  getTask(){
    return this.http.get<any>(this.taskUrl)
  }

  putTask(seccion){
    const id = seccion.cod_seccion
    const url = `${this.taskUrl}/${id}`
    return this.http.put<any>(url, seccion)
  }

  deleteTask(task){
    const id = task.cod_seccion
    const url = `${this.taskUrl}/${id}`
    return this.http.delete<any>(url)
  }
// Servicios para cuenta de activos
  crearcuenta(cuenta){
  return this.http.post<any>(this.cuentaUrl, cuenta, httpOptions)
  }
  listarcuenta(){
    return this.http.get<any>(this.cuentaUrl, httpOptions)
  }
  deletecuenta(cuenta){
    const id = cuenta.id_cuenta
    const url = `${this.cuentaUrl}/${id}`
    return this.http.delete<any>(url)
  }
  editcuenta(cuenta){
    const id = cuenta.id_cuenta
    const url = `${this.cuentaUrl}/${id}`
    return this.http.put<any>(url, cuenta)
  }

//Servicios para Cooperativa
  cratecoop(coop){
    return this.http.post<any>(this.coopUrl, coop, httpOptions)
  }
  listarcoop(){
    return this.http.get<any>(this.coopUrl)
  }
  deletecoop(coop){
    const id = coop.id_coop
    const url = `${this.coopUrl}/${id}`
    return this.http.delete<any>(url)
  }
  editcoop(coop){
    const id = coop.id_coop
    const url= `${this.coopUrl}/${id}`
    return this.http.put<any>(url, coop)
  }

//Servicios para funcionario
  listfuncionario(){
   return this.http.get<any>(this.fucionarioUrl) 
  }

  getidfunci(id){
    const url = `${this.fucionarioUrl}/${id}`
    return this.http.get<any>(url)
  }

  deletefunci(func){
    const id = func.id_funcionario
    const url = `${this.fucionarioUrl}/${id}`
    return this.http.delete<any>(url)
  }
  createfunc(func){
    return this.http.post<any>(this.fucionarioUrl, func, httpOptions)
  }
  editfunc(func){
    const id= func.id_funcionario
    const url=`${this.fucionarioUrl}/${id}`
    return this.http.put<any>(url, func, httpOptions)
  }

  //servicos para la profesion del funcionario
  listprofes(){
    return this.http.get<any>(this.profesionUrl)
  }

  createprofes(profesion){
    return this.http.post<any>(this.profesionUrl, profesion, httpOptions)
  }
  //Servicios para adquisiciin 
  listadqui(){
    return this.http.get<any>(this.adquiUrl)
  }
  createadqui(adqui){
    return this.http.post<any>(this.adquiUrl, adqui, httpOptions)
  }
  deleteadqui(adqui){
    const id = adqui.id_adquisicion
    const url = `${this.adquiUrl}/${id}`
    return this.http.delete<any>(url)
  }
  editadqui(adqui){
    const id = adqui.id_adquisicion
    const url = `${this.adquiUrl}/${id}`
    return this.http.put<any>(url, adqui, httpOptions)
  }
}


