import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  constructor() { }

  // Añadir producto al carrito
  addToCart(item: any, parte: any) {
    const currentCart = this.cartItems.value;

    // Busca si ya existe la parte específica (usando id del celular y el nombre de la parte)
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id && cartItem.nombre_parte === parte.nombre_parte);

    if (existingItem) {
      // Si la parte ya está en el carrito, actualiza la cantidad
      existingItem.quantity += 1;
      console.log('Parte ya en el carrito');
    } else {
      // Si la parte no está en el carrito, la agrega como un nuevo item con cantidad 1
      const newItem = {
        id: item.id_celular, // ID del celular
        modelo: item.modelo, // Modelo del celular
        marca: item.marca, // Marca del celular
        imagen: item.imagen, // Imagen del celular
        nombre_parte: parte.nombre, // Nombre de la parte
        precio: parte.precio, // Precio de la parte
        quantity: 1 // Cantidad inicial de la parte
      };
      currentCart.push(newItem);
      console.log('Este es el carrito:');
      console.log(currentCart);
    }

    this.cartItems.next(currentCart); // Actualiza los productos del carrito
    console.log('Carrito actualizado:', currentCart);

    this.getCartTotal()
  }
  // Eliminar producto del carrito (específicamente una parte del celular)
  removeFromCart(item: any) {
    const currentCart = this.cartItems.value;

    // Filtra los productos del carrito para eliminar solo la parte específica del celular
    const updatedCart = currentCart.filter(cartItem =>
      !(cartItem.id === item.id && cartItem.nombre_parte === item.nombre_parte)
    );

    this.cartItems.next(updatedCart); // Actualiza los productos del carrito
  }

  // Actualizar la cantidad de un producto
  updateQuantity(item: any, quantity: number) {
    const currentCart = this.cartItems.value;
    const existingItem = currentCart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity = quantity;
      this.cartItems.next(currentCart);
    }
  }

  // Obtener el total del carrito
  getCartTotal() {
    const total = this.cartItems.value.reduce((acc, item) => {
      const itemTotal = item.precio * item.quantity; // Usa el precio de la parte
      return acc + (isNaN(itemTotal) ? 0 : itemTotal); // Asegúrate de que itemTotal es un número
    }, 0);

    console.log('Total del carrito:', total);
    return total;
  }
}
