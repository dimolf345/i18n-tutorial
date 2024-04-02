import { MatDialogConfig } from '@angular/material/dialog';
import { mockOrder } from '../../models/mockData';

export const orderDialogConfig: MatDialogConfig = {
  disableClose: true,
  data: {
    order: mockOrder,
  },
  position: {
    top: '10%',
  },
  minWidth: 300,
  width: 'max-content',
  height: 'max-content',
  maxWidth: '90vw',
  minHeight: 300,
};
