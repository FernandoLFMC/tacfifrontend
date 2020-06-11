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
  

  //crear proveedor de activo
  getproveedor(){
    return this.http.get<any>(this.proveedorUrl, httpOptions)
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

  //servicio de insertar activo de terrenos
  createterrenos(terreno){
    return this.http.post<any>(this.terrenosUrl, terreno, httpOptions)
  }

  //servicio de insercion activo de edificios
  createedificios(edificio){
    return this.http.post<any>(this.edificiosUrl, edificio, httpOptions)
  }

  //servicio de insertar activo de vehiculos
  createvehiculos(vehiculo){
    return this.http.post<any>(this.vehiculosUrl, vehiculo, httpOptions)
  }

  //servicio de insertar activo equipos instalacion
  createEquiInstal(equiinstal){
    return this.http.post<any>(this.equipoInstUrl, equiinstal, httpOptions)
  }

  //servicio de insertar activo equipos de computacion
  createEquiCompu(equicompu){
    return this.http.post<any>(this.equipoCompUrl, equicompu, httpOptions)
  }

  //servicio de insertar activo mobiliario enseres
  createmobiliario(mobiliario){
    return this.http.post<any>(this.mobiliarioUrl, mobiliario, httpOptions)
  }
}
