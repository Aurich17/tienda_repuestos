import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CartService } from 'src/app/services/shoppin_cart_service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {
  cartItems: any[] = [];

  // constructor(private cartService: CartService) {
  //   this.cartItems = this.cartService.getCartItems();
  // }

  constructor(public dialogRef: MatDialogRef<ShoppingCartComponent>,private cartService: CartService) {
    // this.cartItems = this.cartService.getCartItems();
  }

  ngOnInit():void{
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
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
    return this.cartService.getCartTotal();
  }

  updateCart() {
    // this.cartService.updateCart(this.cartItems);
  }

  checkout() {
    // Aquí puedes implementar la lógica de pago con PayPal o tu pasarela de pagos
    console.log('Proceeding to checkout');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
