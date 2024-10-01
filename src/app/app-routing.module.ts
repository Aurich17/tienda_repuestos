import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdminComponent } from './administrador_panel/presentacion/panel-admin/panel-admin.component';
import { BandejaPrincipalComponent } from './bandeja-principal/bandeja-principal.component';
import { MantProductoComponent } from './administrador_panel/presentacion/mant-producto/mant-producto.component';
import { MantUsersComponent } from './administrador_panel/presentacion/mant-users/mant-users.component';
import { ShoppingCartComponent } from './bandeja-principal/components/shopping-cart/shopping-cart.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  // Rutas principales que ocupan toda la pantalla
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: BandejaPrincipalComponent },
  // { path: 'shopping_cart', component: ShoppingCartComponent},

  // Rutas dentro del admin que ocupan toda la pantalla
  { path: 'admin', component: PanelAdminComponent, canActivate: [AdminGuard],
    children: [
      // Esta es la ruta secundaria que mostrará solo en una parte específica del layout
      { path: 'add-product', component: MantProductoComponent },
      { path: 'mant-users', component: MantUsersComponent }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
