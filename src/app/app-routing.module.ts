import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListTaskComponent } from './task/home/list-task.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component'
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
import { OtroseditNewComponent } from './activonew/otrosedit-new/otrosedit-new.component'

import { TerrenosListComponent } from './activolist/terrenos-list/terrenos-list.component'

import { AuthGuard } from './guard/auth.guard'
import { ListSeccionComponent } from './csc/list-seccion/list-seccion.component'
import { ListCoopComponent } from './csc/list-coop/list-coop.component'

import { MovimientosComponent } from './activonew/movimientos/movimientos.component'
import { MovimientosListComponent } from './activolist/movimientos-list/movimientos-list.component'

import { ComputacionListComponent } from './activolist/computacion-list/computacion-list.component'
import { EdificiosListComponent } from './activolist/edificios-list/edificios-list.component'
import { InstalacionListComponent } from './activolist/instalacion-list/instalacion-list.component'
import { MoviliarioListComponent } from './activolist/moviliario-list/moviliario-list.component'
import { VehiculosListComponent } from './activolist/vehiculos-list/vehiculos-list.component'
import { ReportesComponent } from './activolist/reportes/reportes.component'

import { DepreciacionMensualComponent } from './depreciacion/depreciacion-mensual/depreciacion-mensual.component'
import { DepreciacionAnualComponent } from './depreciacion/depreciacion-anual/depreciacion-anual.component';
import { ListTipoCuentaComponent } from './csc/list-tipo-cuenta/list-tipo-cuenta.component';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'tasks',
    component: ListTaskComponent,
    //canActivate: [AuthGuard]
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
    path: 'list-user',
    component: UserListComponent
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
    path: 'reportes',
    component:ReportesComponent
  },
  {
    path: 'lista-terrenos/:id',
    component: TerrenosListComponent
  },
  {
    path: 'lista-computacion/:id',
    component: ComputacionListComponent
  },
  {
    path: 'lista-edificios/:id',
    component: EdificiosListComponent
  },
  {
    path: 'lista-instalacion/:id',
    component: InstalacionListComponent
  },
  {
    path: 'lista-moviliario/:id',
    component: MoviliarioListComponent
  },
  {
    path: 'lista-vehiculos/:id',
    component: VehiculosListComponent
  },
  //crear activos
  {
    path: 'terrenos-new',
    component: TerrenosNewComponent
  },
  {
    path: 'terrenos-new/:id',
    component: TerrenosNewComponent
  },
  {
    path: 'edificios-new',
    component: EdificiosNewComponent
  },
  {
    path: 'edificios-new/:id',
    component: EdificiosNewComponent
  },
  {
    path: 'moviliario-new',
    component: MoviliarioNewComponent
  },
  {
    path: 'moviliario-new/:id',
    component: MoviliarioNewComponent
  },
  {
    path: 'instalacion-new',
    component: InstalacionNewComponent
  },
  {
    path: 'instalacion-new/:id',
    component: InstalacionNewComponent
  },
  {
    path: 'computacion-new',
    component: ComputacionNewComponent
  },
  {
    path: 'computacion-new/:id',
    component: ComputacionNewComponent
  },
  {
    path: 'vehiculos-new',
    component: VehiculosNewComponent
  },
  {
    path: 'vehiculos-new/:id',
    component: VehiculosNewComponent
  },
  {
    path: 'otros-new/:id',
    component: OtrosNewComponent
  },
  {
    path: 'otrosedit-new/:id',
    component: OtroseditNewComponent
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
  },
  {
    path: 'listar-tipocuenta',
    component: ListTipoCuentaComponent
  },
  //crear movimiento de activo
  {
    path: 'create-movimiento/:id',
    component: MovimientosComponent
  },
  {
    path: 'list-movimiento',
    component: MovimientosListComponent
  },
  //deprecicacion
  {
    path: 'depreciacionmensual',
    component: DepreciacionMensualComponent
  },
  {
    path: 'depreciacionanual',
    component: DepreciacionAnualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
