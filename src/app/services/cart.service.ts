import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { Cake } from '../models/cake';
import { Cart, OrderItem } from '../models/cart';
import { ContactFormData, IContactForm } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Cake[] | null = null;

  cart: WritableSignal<Cart> = signal({});

  isCartEmpty = computed(() => Object.keys(this.cart()).length === 0);

  cartItems = computed(() =>
    Object.values(this.cart()).reduce((acc, curr) => acc + curr.quantity, 0)
  );

  userData!: ContactFormData

  addToCart(productName: string, details: OrderItem) {
    this.cart.update((state) => ({
      ...state,
      [productName]: details,
    }));
  }

  removeFromCart(removedProduct: string) {
    this.cart.update((state) => {
      const { [removedProduct]: deletedProduct, ...otherProducts } = state;
      return otherProducts;
    });
  }
}
