import { CakeDTO } from './cake';
import { Cart, Order } from './cart';

export const mockCakes: CakeDTO[] = [
  {
    id: 1,
    name: 'Torta paradiso',
    description:
      "È una ricetta di origini antiche, inventata nel 1800 da Enrico Vigoni, un pasticciere pavese, e sembra che debba il suo nome all’espressione di una nobildonna che, al momento dell'assaggio, esclamò: 'Questa torta è un paradiso'.",
    ingredients: 'burro,zucchero,uova,vaniglia',
    price: 20.5,
    availability: 4,
    altText: 'una torta paradiso con dello zucchero a velo sopra',
    imageUrl:
      'https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2023/05/torta-paradiso.jpg',
  },
  {
    id: 2,
    name: 'Pastiera',
    description:
      'Non ha bisogno di presentazioni la pastiera, torta della città di Napoli per eccellenza che originariamente appartiene alla tradizione pasquale.',
    ingredients: 'grano cotto,ricotta, zucchero, uova',
    price: 18.5,
    availability: 2,
    altText: 'pastiera napoletana su alzata di vetro',
    imageUrl:
      'https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2022/03/Pastiera.jpg',
  },
  {
    id: 3,
    name: 'Cassata Siciliana',
    description:
      'La cassata siciliana è un grande classico della Sicilia, in particolare della tradizione palermitana, e in origine veniva preparata in occasione della Pasqua, anche se oggi è diffusa tutto l’anno.',
    ingredients: 'ricotta,zucchero,frutta candita,pasta reale',
    price: 23.0,
    availability: 4,
    altText: 'cassata siciliana su tavola inbandita',
    imageUrl:
      'https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2021/06/Cassata-siciliana.jpg',
  },
  {
    id: 4,
    name: 'Torta Gianduia',
    description:
      'La torta gianduia è un dessert tipico della pasticceria piemontese, che si prepara senza farina e senza lievito, ed è quindi adatta a tutti coloro che soffrono di intolleranza al glutine.',
    ingredients: 'gianduia,nocciole,burro,uova',
    price: 21.0,
    availability: 6,
    altText: 'torta gianduia con accanto tazzina di caffè',
    imageUrl:
      'https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2021/01/torta-gianduia-still-life-2.jpg',
  },
];

export const mockOrder: Order = {
  data: [
    {
      orderId: 'INCREMENT',
      productId: 5,
      quantity: 2,
      price: 20.0,
    },
  ],
};
