export type CakeDTO = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  altText: string;
  ingredients: string;
  price: number;
  availability: number;
};

export type Cake = CakeDTO & {
  ingredients: string[];
};
