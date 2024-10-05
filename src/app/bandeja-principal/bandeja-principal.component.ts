import { Component, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DetailsPhoneComponent } from './components/details-phone/details-phone.component';
import { ApiService } from '../services/services_api';
import { LoginComponent } from '../login/login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMessageComponent } from '../message_custom/custom-message/custom-message.component'; // Importa el componente personalizado
import { ActivatedRoute, Router } from '@angular/router';
import { CelularResponse } from '../administrador_panel/domain/response/administrador_response';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
// import { faSignInAlt, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bandeja-principal',
  templateUrl: './bandeja-principal.component.html',
  styleUrls: ['./bandeja-principal.component.css'],
  encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.None
})
export class BandejaPrincipalComponent {
  // faSignInAlt = faSignInAlt;
  // faShoppingCart = faShoppingCart;
  // faSignOutAlt = faSignOutAlt;
  isLoggedIn: boolean = false;
  isAdmin: boolean = true;

  constructor(public dialog: MatDialog,private snackBar: MatSnackBar,private apiService: ApiService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(){
    this.muestraPhone()
    this.isLoggedIn = !!localStorage.getItem('access_token');

    this.route.queryParams.subscribe(params => {
      const paymentId = params['paymentId'];
      const payerId = params['PayerID'];

      if (paymentId && payerId) {
        this.apiService.executePayment(paymentId, payerId).subscribe(
          (response) => {
            // Manejar la respuesta de la ejecución del pago
            console.log('Payment executed successfully', response);
          },
          (error) => {
            console.error('Error executing payment', error);
          }
        );
      }
    });
  }
  // OPEN MODAL
  openDetails(item:any) {
    this.dialog.open(DetailsPhoneComponent, {
      width: '70vw',  // ancho
      height: '90vh',  // altura
      //border-radius: '20px',
      data: item
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

  openLogin() {
    this.dialog.open(LoginComponent, {
      width: '400px',
      height: '500px',        // Clase personalizada para el fondo
    });
  }

  list = [
    {
      nombre: "Motorola",
      precio: "S/540",
      imagen: "https://claroperupoc.vtexassets.com/arquivos/ids/1736549/moto-g24-1.png?v=638446704396930000",
      favorite: false
    },
    {
      nombre: "Samsung",
      precio: "S/600",
      imagen: "https://images.samsung.com/is/image/samsung/p6pim/pe/sm-s921blbmltp/gallery/pe-galaxy-s24-488992-sm-s921blbmltp-thumb-542940252", // Aquí deberías poner el enlace real de la imagen del Samsung
      favorite: false
    },
    {
      nombre: "iPhone",
      precio: "S/1200",
      imagen: "https://laptronic.pe/catalogo/wp-content/uploads/iPhone-13-128GB.png" // Aquí deberías poner el enlace real de la imagen del iPhone
    ,favorite: false
    },
    {
      nombre: "Motorola",
      precio: "S/540",
      imagen: "https://claroperupoc.vtexassets.com/arquivos/ids/1736549/moto-g24-1.png?v=638446704396930000"
    ,favorite: false},
    {
      nombre: "Samsung",
      precio: "S/600",
      imagen: "https://images.samsung.com/is/image/samsung/p6pim/pe/sm-s921blbmltp/gallery/pe-galaxy-s24-488992-sm-s921blbmltp-thumb-542940252" // Aquí deberías poner el enlace real de la imagen del Samsung
    ,favorite: false
    },
    {
      nombre: "iPhone",
      precio: "S/1200",
      imagen: "https://laptronic.pe/catalogo/wp-content/uploads/iPhone-13-128GB.png" // Aquí deberías poner el enlace real de la imagen del iPhone
    ,favorite: false
    },
    {
      nombre: "Motorola",
      precio: "S/540",
      imagen: "https://claroperupoc.vtexassets.com/arquivos/ids/1736549/moto-g24-1.png?v=638446704396930000"
    ,favorite: false
    },
    {
      nombre: "Samsung",
      precio: "S/600",
      imagen: "https://images.samsung.com/is/image/samsung/p6pim/pe/sm-s921blbmltp/gallery/pe-galaxy-s24-488992-sm-s921blbmltp-thumb-542940252" // Aquí deberías poner el enlace real de la imagen del Samsung
    ,favorite: false
    },
    {
      nombre: "iPhone",
      precio: "S/1200",
      imagen: "https://laptronic.pe/catalogo/wp-content/uploads/iPhone-13-128GB.png",
      favorite: false
    },
    {
      nombre: "Samsung",
      precio: "S/600",
      imagen: "https://images.samsung.com/is/image/samsung/p6pim/pe/sm-s921blbmltp/gallery/pe-galaxy-s24-488992-sm-s921blbmltp-thumb-542940252",
      favorite: false
    },
    {
      nombre: "Motorola",
      precio: "S/540",
      imagen: "https://claroperupoc.vtexassets.com/arquivos/ids/1736549/moto-g24-1.png?v=638446704396930000"
    ,favorite: false
    },
    {
      nombre: "iPhone",
      precio: "S/1200",
      imagen: "https://laptronic.pe/catalogo/wp-content/uploads/iPhone-13-128GB.png" // Aquí deberías poner el enlace real de la imagen del iPhone
    ,favorite: false
    }
  ];

  toggleFavorite(item: any) {
    item.favorite = !item.favorite;
  }

  mensaje(){
    this.snackBar.open('Registration successful!', 'Close', {
      duration: 3000, // El mensaje dura 3 segundos
      // panelClass: ['custom-snackbar'], // Aplica la clase personalizada
      verticalPosition: "top", // Posición del snackbar
      horizontalPosition: "end"
    });
  }

  celulares!:CelularResponse[]

  muestraPhone(){
    this.apiService.getCelulares().subscribe(
      (data: CelularResponse[]) => {
        this.celulares = data;
      },
      error => {
        console.error('Error al obtener marcas', error);
      }
    );
  }

  logout(): void {
    // Eliminar el token de localStorage y actualizar el estado
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
  }
}
