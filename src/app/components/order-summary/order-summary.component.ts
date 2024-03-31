import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CartService } from '../../services/cart.service';
import { TableData } from '../../models/table';

@Component({
  selector: 'ng-order-summary',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
  templateUrl: './order-summary.component.html',
  styles: ``,
})
export class OrderSummaryComponent {
  #cart = inject(CartService);

  tableColumns = ['no', 'name', 'quantity', 'price'];
  tableData: TableData[] = this.mapCartToTableData();


  ngOnInit() {
    console.log(this.tableData);
  }





  private mapCartToTableData() {
    return Object.entries(this.#cart.cart()).reduce((acc, [key, value], index) => {
    const test = {
      no: index+1,
      name: key,
      quantity: value.quantity,
      price: value.unitPrice,
      total: value.quantity * value.unitPrice
    }
    return [...acc, test]
  } , [] as TableData[])
  }
}
