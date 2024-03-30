import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { WithLoadingPipe } from '../../pipes/with-loading.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { delay, map, Observable, of, tap } from 'rxjs';
import { Cake, CakeDTO } from '../../models/cake';
import { ProductCardComponent } from '../product-card/product-card.component';
import { mockCakes } from '../../models/mockData';
import { CartService } from '../../services/cart.service';

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
  ],
  templateUrl: './product-list.component.html',
  styles: `
    .product-list-container {
      width: 70vw;
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
      padding: 2rem;
      display: grid;
      max-width: 100%;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .product {
      max-width: 400px;
      width: 100%;
      align-self: stretch;
    }
  `,
})
export class ProductsListComponent implements OnInit {
  #api = inject(ApiService);
  #cart = inject(CartService);

  products$!: Observable<Cake[]>;

  ngOnInit(): void {
    this.checkProducts();
  }

  private checkProducts() {
    if (!this.#cart.products) {
      this.products$ = this.#api
        .getProducts()
        .pipe(tap((data) => (this.#cart.products = data)));
    } else {
      this.products$ = of(this.#cart.products);
    }
  }
}

//  cakes.map((cake) => ({
//         ...cake,
//         ingredients: cake.ingredients.split(','),
//       }))
