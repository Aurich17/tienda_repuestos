import { Component, ViewEncapsulation,HostListener } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DetailsPhoneComponent } from './components/details-phone/details-phone.component';
import { ApiService } from '../services/services_api';
import { LoginComponent } from '../login/login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMessageComponent } from '../message_custom/custom-message/custom-message.component'; // Importa el componente personalizado
import { ActivatedRoute, Router } from '@angular/router';
import { CelularResponse } from '../administrador_panel/domain/response/administrador_response';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthService } from '../services/auth_service';
import { insertWishListRequest, listaWishListRequest, PhoneListaRequest } from '../administrador_panel/domain/request/administrador_request';
import { MessageService } from 'primeng/api';
// import { faSignInAlt, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bandeja-principal',
  templateUrl: './bandeja-principal.component.html',
  styleUrls: ['./bandeja-principal.component.css'],
  encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.None
})
export class BandejaPrincipalComponent {
  //CARRUSEL
  imageVisible:number = 4
  isLoggedIn: boolean = false;
  isAdmin: boolean = true;
  wishList: any[] = [];
  imageObject:any = [];
  celularesPorMarca: { [key: string]: CelularResponse[] } = {};

  constructor(private messageService: MessageService,public dialog: MatDialog,private snackBar: MatSnackBar,private apiService: ApiService,private router: Router, private route: ActivatedRoute,private authService: AuthService) {}

  screenWidth!: number;

  show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message});
  }

  ngOnInit(){
    this.muestraPhone()
    this.onResize();
    // this.isLoggedIn = !!localStorage.getItem('access_token');
    this.authService.checkLoginStatus()
    if(localStorage.getItem('access_token') != null){
      this.isLoggedIn = true
    }
  }
  // OPEN MODAL
  openDetails(item:any) {
    this.dialog.open(DetailsPhoneComponent, {
      width: '70vw',  // ancho
      height: '90vh',  // altura
      data: item
    });
  }

  openShoppingCart() {
    if (this.isLoggedIn) {
      this.dialog.open(ShoppingCartComponent, {
        width: '60vw',  // ancho
        height: '90vh',  // altura
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
      verticalPosition: "top", // Posición del snackbar
      horizontalPosition: "end"
    });
  }

  celulares!:CelularResponse[]

  muestraDatos(){
  }

   isValidBase64(value:any) {
    const pattern = /^[A-Za-z0-9+/]+={0,2}$/; // Validación de base64
    return pattern.test(value);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.imageVisible = 1
    }
    // Puedes usar `this.screenWidth` para aplicar lógica condicional aquí
  }

  muestraPhone() {
    const user_request: PhoneListaRequest = <PhoneListaRequest>{};
    user_request.name_phone = '%';

    // Obtén la lista de celulares
    this.apiService.getCelulares(user_request).subscribe(
      (data: CelularResponse[]) => {
        this.celulares = data;

        // Obtén la lista de deseos del usuario
        const reques_wishList:listaWishListRequest = <listaWishListRequest>{}
        reques_wishList.p_id_usuario = localStorage.getItem('user_id') !== null? Number(localStorage.getItem('user_id')) : undefined;
        this.apiService.listaWishList(reques_wishList).subscribe(
          (listaDeseos: { id_celular: number; en_lista_deseos: number }[]) => {
            // Mapea la lista de deseos a un Set para acceso rápido
            const deseosSet = new Set(
              listaDeseos
                .filter(d => d.en_lista_deseos === 1) // Solo los deseados
                .map(d => d.id_celular)
            );

            // Marca los celulares que están en la lista de deseos
            this.celulares.forEach(celular => {
              celular.isInWishlist = deseosSet.has(celular.id_celular); // `true` si está en la lista
            });

            // Agrupa celulares por marca
            const celularesPorMarca = new Map<string, CelularResponse[]>();
            this.celulares.forEach(celular => {
              const marca = celular.marca;
              if (!celularesPorMarca.has(marca)) {
                celularesPorMarca.set(marca, []);
              }
              celularesPorMarca.get(marca)?.push(celular);
            });

            this.celularesPorMarca = Array.from(celularesPorMarca.entries()).reduce<{ [key: string]: CelularResponse[] }>((acc, [marca, celulares]) => {
              acc[marca] = celulares;
              return acc;
            }, {});
          },
          error => {
            console.error('Error al obtener lista de deseos', error);
          }
        );
      },
      error => {
        console.error('Error al obtener celulares', error);
      }
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isLoggedIn = false;
  }

  toggleWishlist(item: any) {
    const wishList_request: insertWishListRequest = <insertWishListRequest>{};
    wishList_request.p_id_usuario = localStorage.getItem('user_id') !== null? Number(localStorage.getItem('user_id')) : undefined;
    wishList_request.p_id_celular = item.id_celular;
    item.isInWishlist = !item.isInWishlist;
    if (item.isInWishlist) {
      wishList_request.p_deseado = true
      this.apiService.insertWishList(wishList_request).subscribe(response => {
        this.show('success', 'AGREGADO A LISTA DE DESEADOS');
      });
    } else {
      wishList_request.p_deseado = false
      this.apiService.insertWishList(wishList_request).subscribe(response => {});
    }

  }

  botonDetalles(){
  }

  goToDetails(id: number): void {
    this.router.navigate(['/details-phone', id]);
  }
}


