import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/services_api';
import { ShoppingCartComponent } from '../bandeja-principal/components/shopping-cart/shopping-cart.component';
import { AuthService } from '../services/auth_service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(public dialog: MatDialog,private snackBar: MatSnackBar,private apiService: ApiService,private router: Router, private route: ActivatedRoute,private authService: AuthService) {}
  isLoggedIn: boolean = false;

  ngOnInit(){
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      height: '500px',        // Clase personalizada para el fondo
    });
  }

  logout() {
    this.authService.logout(); // Llamar al servicio para cerrar sesión
    localStorage.removeItem('access_token');
  }
}
