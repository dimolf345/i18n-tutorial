import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cake } from '../../models/cake';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { filter } from 'rxjs';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'ng-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatChipsModule,
    TitleCasePipe,
  ],
  templateUrl: './product-card.component.html',
  styles: `


    .img {
      height: 200px;
      object-fit: cover;
    }

    .card-heading {
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0;
      text-wrap: nowrap;

    }

    .btn-text {
      display: inline-block;
      padding: 4px 8px 0;
    }

    mat-card-actions {
      margin-top: auto;
      min-height: 95px;
    }

    .action-btn {
      margin: 0 0.5rem;
    }

    .quantity-input {
      margin-top: auto;
      max-width: 150px;
      text-align: center;
    }

    .no-number-control {
      appearance: textfield !important;
      text-align: center;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  #fb = inject(FormBuilder);
  #cart = inject(CartService);

  @Input({ required: true })
  product!: Cake;

  showQuantityInput: WritableSignal<boolean> = signal(false);
  quantityInput!: FormControl<number | null>;

  initializeFormEffect = effect(() => {
    if (this.showQuantityInput()) {
      this.quantityInput.setValue(1);
    } else {
      this.quantityInput.setValue(null);
    }
  });

  ngOnInit(): void {
    this.quantityInput = this.#fb.control<number>(1, [
      Validators.max(this.product.availability),
    ]);

    this.quantityInput.valueChanges
      .pipe(filter(() => this.quantityInput.valid))
      .subscribe((quantity) => {
        if (quantity) {
          this.#cart.addToCart(this.product.name, {
            id: this.product.id,
            unitPrice: this.product.price,
            quantity,
          });
        } else {
          this.#cart.removeFromCart(this.product.name);
        }
      });
  }

  changeQuantity(variation: number) {
    const newValue = this.quantityInput.value! + variation;

    if (newValue === 0) {
      this.showQuantityInput.set(false);
      return;
    }

    if (newValue > this.product.availability + 1) {
      return;
    } else {
      this.quantityInput.setValue(newValue);
    }
  }
}
