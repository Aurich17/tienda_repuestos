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

@NgModule({
  declarations: [
    AppComponent,
    BandejaPrincipalComponent,
    DetailsPhoneComponent,
    TableComponent,
    LoginComponent,
    CustomMessageComponent
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
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
