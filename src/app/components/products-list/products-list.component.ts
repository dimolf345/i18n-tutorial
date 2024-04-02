import { Component, computed, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { WithLoadingPipe } from '../../pipes/with-loading.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable, of, tap } from 'rxjs';
import { Cake } from '../../models/cake';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartService } from '../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ng-products-list',
  standalone: true,
  imports: [
    MatCardModule,
    AsyncPipe,
    NgIf,
    WithLoadingPipe,
    MatProgressSpinnerModule,
    ProductCardComponent,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './product-list.component.html',
  styles: `
    .title {
      margin: 1rem !important;
    }

    .product-list-container {
      width: 80vw;
      max-width: 800px;
      margin: 0 auto;
      min-width: 300px;
      min-height: 800px;
    }

    .loader-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .product-list {
      padding: 1rem 2rem;
      display: grid;
      max-width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
    }

    .product {
      max-width: 400px;
      width: 100%;
      align-self: stretch;
    }

    .order-link {
      width: max-content;
      margin: 14px auto;
      display: block;
      line-height: 36px;
    }
  `,
})
export class ProductsListComponent implements OnInit {
  #api = inject(ApiService);
  #cart = inject(CartService);

  products$!: Observable<Cake[]>;

  showLink = computed(() => !this.#cart.isCartEmpty());

  ngOnInit(): void {
    this.checkProducts();
  }

  private checkProducts() {
    console.log(this.#api.test);

    if (!this.#cart.products) {
      this.products$ = this.#api
        .getProducts()
        .pipe(tap((data) => (this.#cart.products = data)));
    } else {
      this.products$ = of(this.#cart.products);
    }
  }
}
