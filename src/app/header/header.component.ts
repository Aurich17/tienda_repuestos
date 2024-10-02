import { Component } from '@angular/core';
import { LoginComponent } from '../login/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/services_api';
import { ShoppingCartComponent } from '../bandeja-principal/components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public dialog: MatDialog,private snackBar: MatSnackBar,private apiService: ApiService,private router: Router, private route: ActivatedRoute) {}
  isLoggedIn: boolean = false;

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      height: '500px',        // Clase personalizada para el fondo
    });
  }

  openShoppingCart() {
    if (this.isLoggedIn) {
      this.dialog.open(ShoppingCartComponent, {
        width: '60vw',  // ancho
        height: '90vh',  // altura
        //border-radius: '20px',
        // data: item,
        disableClose: true
      });// Lógica para abrir el carrito de compras
    } else {
      alert('Por favor, inicie sesión para acceder al carrito');
    }
  }

  logout(): void {
    // Eliminar el token de localStorage y actualizar el estado
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
  }
}
