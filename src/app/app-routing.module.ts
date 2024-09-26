import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelAdminComponent } from './administrador_panel/presentacion/panel-admin/panel-admin.component';
import { BandejaPrincipalComponent } from './bandeja-principal/bandeja-principal.component';
import { MantProductoComponent } from './administrador_panel/presentacion/mant-producto/mant-producto.component';

const routes: Routes = [
  // Rutas principales que ocupan toda la pantalla
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', component: BandejaPrincipalComponent },

  // Rutas dentro del admin que ocupan toda la pantalla
  {
    path: 'admin',
    component: PanelAdminComponent,
    children: [
      // Esta es la ruta secundaria que mostrará solo en una parte específica del layout
      { path: 'add-product', component: MantProductoComponent }
    ]
  }
];
// const routes: Routes = [
//   {
//     path: '',
//     component: BandejaPrincipalComponent,
//     //outlet: 'secondary'  // Especificar que este componente se cargue en el outlet secundario
//   },
//   {
//     path: 'admin',
//     component: PanelAdminComponent,
//     children: [
//       // { path: 'dashboard', component: DashboardComponent },
//       { path: 'add-product', component: MantProductoComponent }
//     ]
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
