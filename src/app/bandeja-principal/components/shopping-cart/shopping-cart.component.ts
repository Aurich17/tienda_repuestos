import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/services_api';
import { CartService } from 'src/app/services/shoppin_cart_service';
import { PayPalResponse } from './response/response_shopping';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

declare var paypal: any; // Declarar PayPal como variable global
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent {
  cartItems: any[] = [];
  totalPrecio: number = 0;
  exchangeRate: number = 0;
  penAmount: number = 0;
  usdAmount: number | null = null;
  // constructor(private cartService: CartService) {
  //   this.cartItems = this.cartService.getCartItems();
  // }

  constructor(
    private cartService: CartService,
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService,
  ) {
    // this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });

    this.apiService.getPayPalClientId().subscribe((response: any) => {
      this.loadPayPalScript(response.client_id);
    });

    this.cargaCambio();
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
    this.totalPrecio = this.cartService.getCartTotal();
    return this.totalPrecio;
  }

  updateCart() {
    // this.cartService.updateCart(this.cartItems);
  }

  checkout() {}

  convertToUSD(): void {
    if (this.exchangeRate && this.totalPrecio > 0) {
      this.usdAmount = this.penAmount * this.exchangeRate;
    }
  }
  renderPayPalButton() {
    paypal
      .Buttons({
        style: {
          layout: 'horizontal',
        },
        createOrder: (data: any, actions: any) => {
          let total = this.getCartTotal();
          total = total / this.exchangeRate;
          total = parseFloat(total.toFixed(2));
          return this.apiService
          .createPayment(total, 'USD')
          .toPromise()
          .then((response: any) => {
            if (response && response.orderId) {
              console.log('ID de orden:', response.orderId);
              return response.orderId; // Devuelve solo el ID de la orden
            } else {
              throw new Error('No se recibió un ID de orden válido');
            }
          })
          .catch((error: any) => {
            console.error('Error creando el pago', error);
            throw new Error('No se pudo crear el pago');
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            this.show('success', 'Pago completado exitosamente');
            this.router.navigate(['/']);
          });
        },
        onError: (err: any) => {
          console.error('Error en el pago', err);
        },
      })
      .render('#paypal-button-container');
  }

  show(type: string, message: string) {
    this.messageService.add({ severity: type, detail: message});
  }

  loadPayPalScript(clientId: string) {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    script.onload = () => {
      this.renderPayPalButton(); // Cuando el script se haya cargado, renderizar el botón
    };
    document.body.appendChild(script);
  }

  cargaCambio() {
    this.apiService.getExchangeRate().subscribe({
      next: (response) => {
        if (response?.USDPEN?.ask) {
          this.exchangeRate = parseFloat(response.USDPEN.ask);
        }
      },
      error: (error) => {
        console.error('Error al cargar la tasa de cambio:', error);
      },
    });
  }
}
