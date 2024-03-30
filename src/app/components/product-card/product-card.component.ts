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
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
  ],
  templateUrl: './product-card.component.html',
  styles: `
    mat-card {
      padding-bottom: 1rem;
    }

    .img {
      height: 200px;
      object-fit: cover;
    }

    .card-heading {
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      text-wrap: nowrap;

    }

    .btn-text {
      display: inline-block;
      padding: 4px 8px 0;
    }

    mat-card-actions {
      margin-top: auto;
      min-height: 90px;
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
  private fb = inject(FormBuilder);

  @Input({ required: true })
  product!: Cake;

  showQuantityInput: WritableSignal<boolean> = signal(false);
  quantityInput!: FormControl<number | null>;

  initializeFormEffect = effect(() => {
    if (this.showQuantityInput()) {
      this.quantityInput.setValue(1, { emitEvent: false });
    } else {
      this.quantityInput.setValue(null, { emitEvent: false });
    }
  });

  ngOnInit(): void {
    this.quantityInput = this.fb.control<number>(1, [
      Validators.max(this.product.availability),
    ]);
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
      this.quantityInput.setValue(newValue, { emitEvent: false });
    }
  }
}
