import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../services/cart.service';
import { TableData } from '../../models/table';
import { CurrencyPipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'ng-order-summary',
  standalone: true,
  imports: [MatTableModule, MatCardModule, CurrencyPipe, MatDividerModule],
  templateUrl: './order-summary.component.html',
  styles: `
    mat-card {
      height: 100%;
    }

    mat-divider {
      margin-top: auto;
    }

    .total {
      padding: 1rem 3rem 1rem 1rem;
    }
  `,
})
export class OrderSummaryComponent {
  #cart = inject(CartService);

  tableColumns = ['no', 'name', 'quantity', 'price', 'total'];
  tableData: TableData[] = this.mapCartToTableData();
  total!: number;

  private mapCartToTableData() {
    let orderTotalPrice = 0;
    const data = Object.entries(this.#cart.cart()).reduce(
      (acc, [key, value], index) => {
        const tableRow = {
          no: index + 1,
          name: key,
          quantity: value.quantity,
          price: value.unitPrice,
          total: value.quantity * value.unitPrice,
        };

        orderTotalPrice += tableRow.total;

        return [...acc, tableRow];
      },
      [] as TableData[]
    );
    this.total = orderTotalPrice;
    return data;
  }
}
