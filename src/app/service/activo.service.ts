import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { tick } from '@angular/core/testing';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ActivoService {

  constructor(private http: HttpClient) { }

  private activoUrl = "http://localhost:8080/api/v1/activo"
  private proveedorUrl = "http://localhost:8080/api/v1/proveedor"
  private etiquetaURL = "http://localhost:8080/api/v1/etiqueta"
  private idactivoUrl = "http://localhost:8080/api/v1/id_activo"
  private terrenosUrl = "http://localhost:8080/api/v1/terrenos"
  private AdqActiUrl = "http://localhost:8080/api/v1/adquisicion_activo"
  private edificiosUrl = "http://localhost:8080/api/v1/edificios"
  private vehiculosUrl = "http://localhost:8080/api/v1/vehiculos"
  private equipoInstUrl = "http://localhost:8080/api/v1/equiposinstalacion"
  private equipoCompUrl = "http://localhost:8080/api/v1/equiposcomputacion"
  private mobiliarioUrl = "http://localhost:8080/api/v1/mobiliarioenseres"

  private infoactivoUrl= "http://localhost:8080/api/v1/infoactivo"
  private infoactiUrl= "http://localhost:8080/api/v1/info_activo"
  
  private subirImageUrl = "http://localhost:8080/api/v1/imagenes/upload"


  getactivo(){
    return this.http.get<any>(this.activoUrl, httpOptions)
  }
  createactivo(activo){
    return this.http.post<any>(this.activoUrl, activo, httpOptions);
  }
  deleteactivo(activo){
    const id = activo.id_activo
    const url = `${this.activoUrl}/${id}`
    return this.http.delete<any>(url)
  }
  getidacti(activo){
    const id = activo
    const url = `${this.activoUrl}/${id}`
    return this.http.get<any>(url)
  }
  putactivo(activo){
    const id =activo.id_activo
    const url = `${this.activoUrl}/${id}`
    return this.http.put<any>(url, activo)
  }

  //para el servicio de imagenes
  SubirImage(archivo: File, id){
    let formData=new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    return this.http.post<any>(this.subirImageUrl, formData)

  }
  

  //crear proveedor de activo
  getproveedor(){
    return this.http.get<any>(this.proveedorUrl, httpOptions)
  }

  getidproveedor(id){
    const url = `${this.proveedorUrl}/${id}`
    return this.http.get<any>(url)
  }

  createproveedor(proveedor){
    return this.http.post<any>(this.proveedorUrl, proveedor, httpOptions)
  }

  //servicio de etiqueta
  getetiqueta(){
    return this.http.get<any>(this.etiquetaURL, httpOptions)
  }
  //servicio get id Activo solo el id
  getIdActivo(){
    return this.http.get<any>(this.idactivoUrl)
  }

  //servicio de adquisicion activo
  createAdquiActi(AdquiActi){
    return this.http.post<any>(this.AdqActiUrl, AdquiActi, httpOptions)
  }
  putAdquiActi(AdquiActi){
    const id =AdquiActi.id_activo
    const url = `${this.AdqActiUrl}/${id}`
    return this.http.put<any>(url, AdquiActi)
  }

  //servicio de insertar activo de terrenos
  createterrenos(terreno){
    return this.http.post<any>(this.terrenosUrl, terreno, httpOptions)
  }
  putTerrenos(terreno){
    const id =terreno.id_activo
    const url = `${this.terrenosUrl}/${id}`
    return this.http.put<any>(url, terreno)
  }

  //servicio de insercion activo de edificios
  createedificios(edificio){
    return this.http.post<any>(this.edificiosUrl, edificio, httpOptions)
  }

  putEdificios(edificio){
    const id =edificio.id_activo
    const url = `${this.edificiosUrl}/${id}`
    return this.http.put<any>(url, edificio)
  }

  //servicio de insertar activo de vehiculos
  createvehiculos(vehiculo){
    return this.http.post<any>(this.vehiculosUrl, vehiculo, httpOptions)
  }
  putVehiculos(vehiculo){
    const id =vehiculo.id_activo
    const url = `${this.vehiculosUrl}/${id}`
    return this.http.put<any>(url, vehiculo)
  }

  //servicio de insertar activo equipos instalacion
  createEquiInstal(equiinstal){
    return this.http.post<any>(this.equipoInstUrl, equiinstal, httpOptions)
  }
  putEquiInstal(equiinstal){
    const id =equiinstal.id_activo
    const url = `${this.equipoInstUrl}/${id}`
    return this.http.put<any>(url,equiinstal)
  }

  //servicio de insertar activo equipos de computacion
  createEquiCompu(equicompu){
    return this.http.post<any>(this.equipoCompUrl, equicompu, httpOptions)
  }
  putEquiCompu(equicompu){
    const id =equicompu.id_activo
    const url = `${this.equipoCompUrl}/${id}`
    return this.http.put<any>(url, equicompu)
  }

  //servicio de insertar activo mobiliario enseres
  createmobiliario(mobiliario){
    return this.http.post<any>(this.mobiliarioUrl, mobiliario, httpOptions)
  }
  putMobiliario(mobiliario){
    const id =mobiliario.id_activo
    const url = `${this.mobiliarioUrl}/${id}`
    return this.http.put<any>(url, mobiliario)
  }

  //actualizar movimiento de activo
  updateinfoacti(infoacti){
    const id = infoacti.id_activo
    const url = `${this.infoactivoUrl}/${id}`
    return this.http.put<any>(url, infoacti, httpOptions)
  }

  createinfo_acti(info_acti){
    return this.http.post<any>(this.infoactiUrl, info_acti, httpOptions)
  }

  deleteinfo_acti(info_acti){
    const id=info_acti
    const url= `${this.infoactiUrl}/${id}`
    return this.http.delete<any>(url)
  }

  getinfo_acti(){
    return  this.http.get<any>(this.infoactiUrl, httpOptions)
  }

}
