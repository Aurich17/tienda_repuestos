import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/services_api';
import { ShoppingCartComponent } from '../bandeja-principal/components/shopping-cart/shopping-cart.component';
import { AuthService } from '../services/auth_service';
import { CartService } from '../services/shoppin_cart_service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(public dialog: MatDialog,private authService: AuthService, public cartService: CartService,private router: Router,private messageService: MessageService) {}
  isLoggedIn: boolean = false;
  products!:[];
  ngOnInit() {
    this.authService.checkLoginStatus(); // Verifica si el usuario sigue logueado al cargar la página
    // Suscribirse al estado de autenticación
    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn; // Actualiza el estado del componente
    });
  }

  show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message });
  }

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      height: '600px',        // Clase personalizada para el fondo
    });
  }

  logout() {
    this.authService.logout(); // Llamar al servicio para cerrar sesión
    localStorage.removeItem('access_token');
    window.location.reload();
  }

  openCartShopping(){
    if(this.cartService.getCartItemCount() > 0){
      this.router.navigate(['/cart']);
    }else{
      this.show('warn','Ningun elemento en el carrito')
    }
  }
}
