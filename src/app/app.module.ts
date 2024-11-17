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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { EditUserComponent } from './administrador_panel/presentacion/edit-user/edit-user.component';
import { PaymentResultComponent } from './bandeja-principal/components/payment-result/payment-result.component';
import { CustomSliderComponent } from './shared/components/custom-slider/custom-slider.component';
import { MantComponentComponent } from './administrador_panel/presentacion/mant-component/mant-component.component';
import { MantMarkComponent } from './administrador_panel/presentacion/mant-mark/mant-mark.component';
import { AuthInterceptor } from './services/auth_interceptor';
import { WishListComponent } from './bandeja-principal/components/wish-list/wish-list.component';
import { UserProfileComponent } from './bandeja-principal/components/user-profile/user-profile.component';
import { HistoryBuyComponent } from './bandeja-principal/components/history-buy/history-buy.component';
//PRIME
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { OrderListModule } from 'primeng/orderlist';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { NewTipoComponent } from './administrador_panel/presentacion/new-tipo/new-tipo.component';


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
    EditUserComponent,
    PaymentResultComponent,
    CustomSliderComponent,
    MantComponentComponent,
    MantMarkComponent,
    WishListComponent,
    UserProfileComponent,
    HistoryBuyComponent,
    NewTipoComponent,
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
    NgImageSliderModule,
    CardModule,
    ButtonModule,
    ImageModule,
    DividerModule,
    CarouselModule,
    InputTextModule,
    PasswordModule,
    InputNumberModule,
    OrderListModule,
    MessagesModule,
    ToastModule,
    BadgeModule,
    DropdownModule,
    PanelModule,
    AvatarModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
