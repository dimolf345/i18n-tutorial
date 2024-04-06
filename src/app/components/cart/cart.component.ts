import { Component, computed, inject } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../services/cart.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { orderDialogConfig } from '../order-dialog/order-dialog.config';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'ng-cart',
  standalone: true,
  imports: [
    ContactFormComponent,
    OrderSummaryComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    RouterLink,
  ],
  templateUrl: './cart.component.html',
  styles: `
  .cart {
    display: grid;
    padding: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;


    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr;
      padding: 1rem;

      .first-on-mobile {
        order: -1;
      }
    }
  }

  button {
    margin-bottom: 2rem;
  }

  .back-link {
    display: inline-block;
    margin-top: 1rem;
  }
  
  `,
})
export class CartComponent {
  #cart = inject(CartService);
  #matDialog = inject(MatDialog);
  #router = inject(Router);

  enableBtn = computed(
    () => this.#cart.contactConfirmed() && this.#cart.cartItems() > 0
  );

  sendOrder() {
    const order = this.#cart.getOrderData();
    const { userData } = this.#cart;

    const dialog = this.#matDialog.open<OrderDialogComponent>(
      OrderDialogComponent,
      {
        ...orderDialogConfig,
        data: {
          order,
          userData,
        },
      }
    );

    dialog.afterClosed().subscribe((redirect) => {
      this.#cart.clearCart();
      redirect && this.#router.navigate(['']);
    });
  }
}
