import { Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { DOCUMENT } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'ng-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    RouterLink,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styles: `
    header {
      position: relative;
    }

    .language-selector {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: -1rem;
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
  #document = inject(DOCUMENT);
  #cart = inject(CartService);
  #language = inject(LanguageService);

  showIcon = computed(() => !this.#cart.isCartEmpty());
  items = this.#cart.cartItems;

  changeLanguage(event: MouseEvent, language: 'it' | 'en') {
    event.preventDefault();
    this.#language.setLanguage(language);

    this.#document.location.href = `/${language}`;
  }
}
