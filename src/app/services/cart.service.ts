import { Injectable } from '@angular/core';
import { Cake } from '../models/cake';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  products: Cake[] | null = null;
}
