import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

export const emptyCartGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cartEmpty = inject(CartService).isCartEmpty();
  return cartEmpty ? router.createUrlTree(['']) : true;
};
