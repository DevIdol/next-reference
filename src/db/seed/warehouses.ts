import { db } from '../db';
import { warehouses } from '../schema';

export const seedWarehouses = async () => {
  await db.insert(warehouses).values([
    {
      name: 'Dawbon Branch',
      address: 'No. 45, Dawbon Road',
      region: 'Yangon',
      contact: '09-123456789',
    },
    {
      name: 'Kyauktada Branch',
      address: 'No. 102, Sule Pagoda Road',
      region: 'Yangon',
      contact: '09-987654321',
    },
  ]);
};
