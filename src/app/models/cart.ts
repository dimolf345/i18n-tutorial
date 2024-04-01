import { ContactFormData } from './contact';

export type OrderItem = {
  id: number;
  unitPrice: number;
  quantity: number;
};

export type Cart = {
  [key: string]: OrderItem;
};

export type Order = {
  data: ({
    orderId: string;
    productId: number;
    quantity: number;
    price: number;
  } & ContactFormData)[];
};
