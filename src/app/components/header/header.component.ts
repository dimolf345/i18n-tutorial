import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ng-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styles: `
    header {
      position: relative;
    }

    .cart-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
    }

    @media screen and (min-width: 600px) {
      .only-md {
        display: none;
      }
    }
  `,
})
export class HeaderComponent {
  cart = inject(CartService);
  showIcon = computed(() => !this.cart.isCartEmpty());
  items = this.cart.cartItems;
}
