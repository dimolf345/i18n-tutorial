export type OrderItem = {
  id: number;
  unitPrice: number;
  quantity: number;
};

export type Cart = {
  [key: string]: OrderItem;
};
