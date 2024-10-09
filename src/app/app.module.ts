import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BandejaPrincipalComponent } from './bandeja-principal/bandeja-principal.component';
import { DetailsPhoneComponent } from './bandeja-principal/components/details-phone/details-phone.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { TableComponent } from './shared/components/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableExporterModule } from 'cdk-table-exporter';
import { MatTableExporterModule } from 'mat-table-exporter';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomMessageComponent } from './message_custom/custom-message/custom-message.component';
import { PanelAdminComponent } from './administrador_panel/presentacion/panel-admin/panel-admin.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MantProductoComponent } from './administrador_panel/presentacion/mant-producto/mant-producto.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { GestorMenusComponent } from './gestor-menus/gestor-menus.component';
import {MatInputModule} from '@angular/material/input';
import { NewPhoneComponent } from './administrador_panel/presentacion/new-phone/new-phone.component';
import {MatSelectModule} from '@angular/material/select';
import { MantUsersComponent } from './administrador_panel/presentacion/mant-users/mant-users.component';
import { ShoppingCartComponent } from './bandeja-principal/components/shopping-cart/shopping-cart.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './administrador_panel/presentacion/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
  declarations: [
    AppComponent,
    BandejaPrincipalComponent,
    DetailsPhoneComponent,
    TableComponent,
    LoginComponent,
    CustomMessageComponent,
    PanelAdminComponent,
    MantProductoComponent,
    GestorMenusComponent,
    NewPhoneComponent,
    MantUsersComponent,
    ShoppingCartComponent,
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    CdkTableExporterModule,
    MatTableExporterModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    NgChartsModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
