import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

export const routes: Routes = [
  { path: '', component: ProductsListComponent },
  { path: 'cart', component: OrderSummaryComponent },
];
