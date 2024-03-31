import { Component } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'ng-cart',
  standalone: true,
  imports: [ContactFormComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styles: `
  .cart {
    display: grid;
    padding: 2rem;
    grid-template-columns: repeat(2, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }
  
  `,
})
export class CartComponent {}
