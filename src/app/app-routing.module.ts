import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdminComponent } from './administrador_panel/presentacion/panel-admin/panel-admin.component';
import { BandejaPrincipalComponent } from './bandeja-principal/bandeja-principal.component';
import { MantProductoComponent } from './administrador_panel/presentacion/mant-producto/mant-producto.component';
import { MantUsersComponent } from './administrador_panel/presentacion/mant-users/mant-users.component';
import { ShoppingCartComponent } from './bandeja-principal/components/shopping-cart/shopping-cart.component';
import { AdminGuard } from './guards/admin.guard';
import { DashboardComponent } from './administrador_panel/presentacion/dashboard/dashboard.component';
import { PaymentResultComponent } from './bandeja-principal/components/payment-result/payment-result.component';
import { DetailsPhoneComponent } from './bandeja-principal/components/details-phone/details-phone.component';
import { MantComponentComponent } from './administrador_panel/presentacion/mant-component/mant-component.component';
import { MantMarkComponent } from './administrador_panel/presentacion/mant-mark/mant-mark.component';
import { HistoryBuyComponent } from './bandeja-principal/components/history-buy/history-buy.component';
import { UserProfileComponent } from './bandeja-principal/components/user-profile/user-profile.component';
import { WishListComponent } from './bandeja-principal/components/wish-list/wish-list.component';

const routes: Routes = [
  // Rutas principales que ocupan toda la pantalla
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: BandejaPrincipalComponent },
  { path: 'cart', component: ShoppingCartComponent},
  { path: 'payment-result', component: PaymentResultComponent },
  { path: 'details-phone/:id', component: DetailsPhoneComponent },
  { path: 'wish-list', component: WishListComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'history', component: HistoryBuyComponent},

  // Rutas dentro del admin que ocupan toda la pantalla
  { path: 'admin', component: PanelAdminComponent, canActivate: [AdminGuard],
    children: [
      // Esta es la ruta secundaria que mostrará solo en una parte específica del layout
      { path: 'dashboard', component: DashboardComponent},
      { path: 'add-product', component: MantProductoComponent },
      { path: 'mant-users', component: MantUsersComponent },
      { path: 'mant-component', component: MantComponentComponent },
      { path: 'mant-mark', component: MantMarkComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
