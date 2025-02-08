import { db } from '../db';
import { users } from '../schema';

export const seedUsers = async () => {
  await db.insert(users).values([
    {
      name: 'Aung Min',
      email: 'aung.min@example.com',
      password: 'password',
      role: 'admin',
      phone: '09-123456789',
      address: 'No. 123, Yangon',
    },
    {
      name: 'Thida',
      email: 'thida@example.com',
      password: 'password123',
      role: 'manager',
      phone: '09-987654321',
      address: 'No. 456, Dawbon Road',
    },
  ]);
};
