import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListTaskComponent } from './task/home/list-task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { SignupComponent } from './signup/signup.component';
import { CrearCscComponent } from './csc/crear-csc/crear-csc.component';
import { ListarCscComponent } from './csc/listar-csc/listar-csc.component';
import { ListarFuncComponent } from './funcionario/listar-func/listar-func.component'
import { CrearFuncComponent }from './funcionario/crear-func/crear-func.component'
import { CrearDatosComponent } from './datoscoop/crear-datos/crear-datos.component';
import { ListarDatosComponent } from './datoscoop/listar-datos/listar-datos.component';
import { ListAdquiComponent } from './csc/list-adqui/list-adqui.component'

import { ActivoListComponent } from './activolist/activo-list/activo-list.component'
import { TerrenosNewComponent } from './activonew/terrenos-new/terrenos-new.component'
import { EdificiosNewComponent } from './activonew/edificios-new/edificios-new.component'
import { MoviliarioNewComponent } from './activonew/moviliario-new/moviliario-new.component'
import { InstalacionNewComponent } from './activonew/instalacion-new/instalacion-new.component'
import { ComputacionNewComponent } from './activonew/computacion-new/computacion-new.component'
import { VehiculosNewComponent } from './activonew/vehiculos-new/vehiculos-new.component'
import { OtrosNewComponent } from './activonew/otros-new/otros-new.component'

import { TerrenosListComponent } from './activolist/terrenos-list/terrenos-list.component'

import { AuthGuard } from './guard/auth.guard'
import { from } from 'rxjs';


import { ListSeccionComponent } from './csc/list-seccion/list-seccion.component'
import { ListCoopComponent } from './csc/list-coop/list-coop.component'

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: ListTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'create',
    component: CreateTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'crearcsc',
    component: CrearCscComponent
  },
  {
    path: 'crear-func',
    component: CrearFuncComponent
  },
  {
    path: 'listar-func',
    component: ListarFuncComponent
  },
  {
    path: 'creardatos',
    component: CrearDatosComponent
  },
  {
    path: 'listardatos',
    component: ListarDatosComponent
  },
  //listar activos
  {
    path: 'listar-activo',
    component: ActivoListComponent
  },
  {
    path: 'lista-terrenos/:id',
    component: TerrenosListComponent
  },
  //crear activos
  {
    path: 'terrenos-new',
    component: TerrenosNewComponent
  },
  {
    path: 'edificios-new',
    component: EdificiosNewComponent
  },
  {
    path: 'moviliario-new',
    component: MoviliarioNewComponent
  },
  {
    path: 'instalacion-new',
    component: InstalacionNewComponent
  },
  {
    path: 'computacion-new',
    component: ComputacionNewComponent
  },
  {
    path: 'vehiculos-new',
    component: VehiculosNewComponent
  },
  {
    path: 'otros-new',
    component: OtrosNewComponent
  },
  //lista de componentes
  {
    path: 'list-seccion',
    component: ListSeccionComponent
  },
  {
    path: 'list-coop',
    component: ListCoopComponent
  },
  {
    path: 'listarcsc',
    component: ListarCscComponent
  },
  {
    path: 'listar-adqui',
    component: ListAdquiComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
