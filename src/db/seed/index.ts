import { seedProducts } from './products';
import { seedUsers } from './users';
import { seedWarehouses } from './warehouses';

export const runSeeders = async () => {
  try {
    console.log('Seeding users...');
    await seedUsers();

    console.log('Seeding products...');
    await seedProducts();

    console.log('Seeding warehouses...');
    await seedWarehouses();

    console.log('Seeding completed successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

runSeeders();
