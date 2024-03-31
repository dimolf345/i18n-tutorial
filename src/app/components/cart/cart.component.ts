import { Component, computed, inject } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'ng-cart',
  standalone: true,
  imports: [
    ContactFormComponent,
    OrderSummaryComponent,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './cart.component.html',
  styles: `
  .cart {
    display: grid;
    padding: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  `,
})
export class CartComponent {
  #cart = inject(CartService);

  enableBtn = computed(
    () => this.#cart.contactConfirmed() && this.#cart.cartItems() > 0
  );
}
