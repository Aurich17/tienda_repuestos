import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { CartService } from 'src/app/services/shoppin_cart_service';
import { PayPalResponse } from './response/response_shopping';
import { Router } from '@angular/router';

declare var paypal: any; // Declarar PayPal como variable global
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartItems: any[] = [];
  totalPrecio:number = 0;
  // constructor(private cartService: CartService) {
  //   this.cartItems = this.cartService.getCartItems();
  // }

  constructor(private cartService: CartService, private apiService: ApiService,private router: Router) {
    // this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit():void{
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.apiService.getPayPalClientId().subscribe((response: any) => {
      this.loadPayPalScript(response.client_id);
    });
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateCart();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
  }

  updateQuantity(item: any, quantity: number) {
    this.cartService.updateQuantity(item, quantity);
  }

  getCartTotal() {
    this.totalPrecio = this.cartService.getCartTotal()
    return this.totalPrecio;
  }

  updateCart() {
    // this.cartService.updateCart(this.cartItems);
  }

  checkout() {
    // Aquí puedes implementar la lógica de pago con PayPal o tu pasarela de pagos
    console.log('Proceeding to checkout');
  }

  async onPay() {
    this.apiService.createPayment(this.totalPrecio, 'USD').subscribe(
        (response: PayPalResponse) => {
            const approvalUrl = response.links.find(link => link.rel === 'approval_url')?.href;

            // Redirigir al usuario a la URL de aprobación de PayPal
            if (approvalUrl) {
                // Redirigir al usuario a approvalUrl
                window.location.href = approvalUrl;
            } else {
                // Manejo de errores en caso de que no se encuentre el approval_url
                console.error('No se encontró la URL de aprobación');
            }
        },
        (error) => {
            console.error('Error creando el pago', error);
        }
    );
}
  renderPayPalButton() {
    paypal.Buttons({
      style: {
        layout: 'horizontal'
      },
      createOrder: (data: any, actions: any) => {
        // Aquí llamas a tu API en FastAPI para crear el pago
        return this.apiService.createPayment(this.totalPrecio, 'USD').toPromise().then((response: any) => {
          // Buscar la URL de aprobación que devuelve tu API
          const approvalUrl = response.links.find((link: any) => link.rel === 'approval_url')?.href;

          if (approvalUrl) {
            // Redirigir al usuario a la URL de PayPal
            window.location.href = approvalUrl;
          } else {
            console.error('No se encontró la URL de aprobación');
          }
        }).catch((error: any) => {
          console.error('Error creando el pago', error);
        });
      }
    }).render('#paypal-button-container'); // Renderizar el botón de PayPal
  }

  loadPayPalScript(clientId: string) {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.onload = () => {
      this.renderPayPalButton(); // Cuando el script se haya cargado, renderizar el botón
    };
    document.body.appendChild(script);
  }
}
