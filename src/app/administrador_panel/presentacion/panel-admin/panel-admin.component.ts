import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth_service';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})


export class PanelAdminComponent {
  @ViewChild(MatSidenav, {static: true})
  sidenav!: MatSidenav;
  isLoggedIn: boolean = false;
  constructor(private observer: BreakpointObserver, private authService:AuthService) {

  }

  ngOnInit(): void {
    this.authService.checkLoginStatus(); // Verifica si el usuario sigue logueado al cargar la página
    // Suscribirse al estado de autenticación
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn; // Actualiza el estado del componente
    });
    this.observer.observe(["(max-width: 800px)"])
    .subscribe((res) => {
      if(res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    })
  }

  logout() {
    this.authService.logout(); // Llamar al servicio para cerrar sesión
    localStorage.removeItem('access_token');
  }
}
