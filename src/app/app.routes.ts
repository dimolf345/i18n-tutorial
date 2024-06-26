import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { CartComponent } from './components/cart/cart.component';
import { emptyCartGuard } from './guards/empty-cart.guard';

export const routes: Routes = [
  // { path: '*', pathMatch: 'full', redirectTo: 'cart' },
  { path: '', component: ProductsListComponent },
  { path: 'cart', component: CartComponent, canActivate: [emptyCartGuard] },
];
