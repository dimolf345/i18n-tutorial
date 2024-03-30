import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cake } from '../../models/cake';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ng-product-card',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatButtonModule, MatIconModule],
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
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input({ required: true })
  product!: Cake;

  showQuantityInput: WritableSignal<boolean> = signal(false);
}
