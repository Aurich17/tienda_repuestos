import { Component, ViewEncapsulation } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DetailsPhoneComponent } from './components/details-phone/details-phone.component';
import { ApiService } from '../services/services_api';
import { LoginComponent } from '../login/login/login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomMessageComponent } from '../message_custom/custom-message/custom-message.component'; // Importa el componente personalizado
import { Router } from '@angular/router';

@Component({
  selector: 'app-bandeja-principal',
  templateUrl: './bandeja-principal.component.html',
  styleUrls: ['./bandeja-principal.component.css'],
  encapsulation: ViewEncapsulation.None
  // encapsulation: ViewEncapsulation.None
})
export class BandejaPrincipalComponent {
  isAdmin: boolean = true;
  constructor(public dialog: MatDialog,private snackBar: MatSnackBar) {}

  // OPEN MODAL
  openDetails(item:any) {
    this.dialog.open(DetailsPhoneComponent, {
      width: '100vw',  // ancho
      height: '90vh',  // altura
      //border-radius: '20px',
      data: item
    });
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
}
