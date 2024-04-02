import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WithLoadingPipe } from '../../pipes/with-loading.pipe';
import { Order } from '../../models/cart';
import { Observable, timeout, timer } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { ContactFormData } from '../../models/contact';

@Component({
  selector: 'ng-order-dialog',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
    WithLoadingPipe,
    NgIf,
    AsyncPipe,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './order-dialog.component.html',
  styles: `
  
  mat-dialog-actions {
    padding-bottom: 2rem;
    gap: 2rem;
  }
  `,
})
export class OrderDialogComponent {
  #api = inject(ApiService);

  matDialogData = inject<{ order: Order; userData: ContactFormData }>(
    MAT_DIALOG_DATA
  );
  response$!: Observable<{ created: number }>;

  payload = { ...this.matDialogData.order, ...this.matDialogData.userData };

  ngOnInit() {
    this.response$ = this.#api.postOrder(this.payload, true);
  }

  retry() {
    this.response$ = this.#api.postOrder(this.payload, true);
  }
}
