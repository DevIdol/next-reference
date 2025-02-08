import { db } from '../db';
import { products } from '../schema';

export const seedProducts = async () => {
  await db.insert(products).values([
    {
      name: 'Dell XPS 13',
      description: 'High-performance laptop',
      priceUSD: '1500',
      category: 'Laptop',
      brand: 'Dell',
      stockQuantity: '25',
    },
    {
      name: 'HP EliteBook 840',
      description: 'Business laptop',
      priceUSD: '1200',
      category: 'Laptop',
      brand: 'HP',
      stockQuantity: '15',
    },
  ]);
};
