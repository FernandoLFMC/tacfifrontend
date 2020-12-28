import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { ListTaskComponent } from './task/home/list-task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatExpansionModule} from '@angular/material/expansion'
import {MatIconModule} from '@angular/material/icon'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatSelectModule} from '@angular/material/select'
import {MatListModule} from '@angular/material/list'
import { MatDialogModule } from '@angular/material/dialog'

import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


import {MatInputModule} from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatCardModule} from '@angular/material/card'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { TokenInterceptorService } from './service/token-interceptor.service'
import {MatMenuModule} from '@angular/material/menu';

import { AuthService } from './service/auth.service'
import { TaskService } from './service/task.service'
import { AuthGuard } from './guard/auth.guard';
import { ListarCscComponent } from './csc/listar-csc/listar-csc.component';
import { CrearCscComponent } from './csc/crear-csc/crear-csc.component';
import { CrearDatosComponent } from './datoscoop/crear-datos/crear-datos.component';
import { ListarDatosComponent } from './datoscoop/listar-datos/listar-datos.component';
import { CrearFuncComponent } from './funcionario/crear-func/crear-func.component';
import { ListarFuncComponent } from './funcionario/listar-func/listar-func.component';

import { CrearCuentaComponent } from './csc/crear-cuenta/crear-cuenta.component';
import { CrearSeccionComponent } from './csc/crear-seccion/crear-seccion.component';
import { CrearCoopComponent } from './csc/crear-coop/crear-coop.component';
import { TerrenosNewComponent } from './activonew/terrenos-new/terrenos-new.component';
import { EdificiosNewComponent } from './activonew/edificios-new/edificios-new.component';
import { MoviliarioNewComponent } from './activonew/moviliario-new/moviliario-new.component';
import { InstalacionNewComponent } from './activonew/instalacion-new/instalacion-new.component';
import { ComputacionNewComponent } from './activonew/computacion-new/computacion-new.component';
import { VehiculosNewComponent } from './activonew/vehiculos-new/vehiculos-new.component';
import { ActivoListComponent } from './activolist/activo-list/activo-list.component';
import { OtrosNewComponent } from './activonew/otros-new/otros-new.component';
import { CrearAdquiComponent } from './csc/crear-adqui/crear-adqui.component';
import { ListAdquiComponent } from './csc/list-adqui/list-adqui.component';
import { ListSeccionComponent } from './csc/list-seccion/list-seccion.component';
import { ListCuentaComponent } from './csc/list-cuenta/list-cuenta.component';
import { ListCoopComponent } from './csc/list-coop/list-coop.component';
import { TerrenosListComponent } from './activolist/terrenos-list/terrenos-list.component';
import { MovimientosComponent } from './activonew/movimientos/movimientos.component';
import { MovimientosListComponent } from './activolist/movimientos-list/movimientos-list.component';
import { ComputacionListComponent } from './activolist/computacion-list/computacion-list.component';
import { EdificiosListComponent } from './activolist/edificios-list/edificios-list.component';
import { InstalacionListComponent } from './activolist/instalacion-list/instalacion-list.component';
import { MoviliarioListComponent } from './activolist/moviliario-list/moviliario-list.component';
import { VehiculosListComponent } from './activolist/vehiculos-list/vehiculos-list.component';
import { OtrosListComponent } from './activolist/otros-list/otros-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { ExportxlsxService } from './service/exportxlsx.service';
import { ReportesComponent } from './activolist/reportes/reportes.component'
import { from } from 'rxjs';
import { DepreciacionAnualComponent } from './depreciacion/depreciacion-anual/depreciacion-anual.component';
import { DepreciacionMensualComponent } from './depreciacion/depreciacion-mensual/depreciacion-mensual.component';
import { ListTipoCuentaComponent } from './csc/list-tipo-cuenta/list-tipo-cuenta.component';
import { CrearTipoCuentaComponent } from './csc/crear-tipo-cuenta/crear-tipo-cuenta.component';
import { OtroseditNewComponent } from './activonew/otrosedit-new/otrosedit-new.component';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    CreateTaskComponent,
    ListTaskComponent,
    ListarCscComponent,
    CrearCscComponent,
    CrearDatosComponent,
    ListarDatosComponent,
    CrearFuncComponent,
    ListarFuncComponent,
    CrearCuentaComponent,
    CrearSeccionComponent,
    CrearCoopComponent,
    TerrenosNewComponent,
    EdificiosNewComponent,
    MoviliarioNewComponent,
    InstalacionNewComponent,
    ComputacionNewComponent,
    VehiculosNewComponent,
    ActivoListComponent,
    OtrosNewComponent,
    CrearAdquiComponent,
    ListAdquiComponent,
    ListSeccionComponent,
    ListCuentaComponent,
    ListCoopComponent,
    TerrenosListComponent,
    MovimientosComponent,
    MovimientosListComponent,
    ComputacionListComponent,
    EdificiosListComponent,
    InstalacionListComponent,
    MoviliarioListComponent,
    VehiculosListComponent,
    OtrosListComponent,
    UserListComponent,
    ReportesComponent,
    DepreciacionAnualComponent,
    DepreciacionMensualComponent,
    ListTipoCuentaComponent,
    CrearTipoCuentaComponent,
    OtroseditNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatSelectModule,
    MatListModule,
    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgbModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule
  ],
  providers: [AuthService, TaskService, AuthGuard,ExportxlsxService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  },

  

],
  entryComponents:[CrearFuncComponent,CrearCuentaComponent,CrearSeccionComponent],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
