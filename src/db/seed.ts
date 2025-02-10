import bcrypt from 'bcrypt';

import { getValidRegionAndTownship } from '@/utils/helpers/helper_fns';
import Logger from '@/utils/logger';

import { db } from './db';
import {
  users,
  warehouses,
  colors,
  products,
  categories,
  orders,
  invoices,
  deliveries,
  drivers,
  complaints,
  returns,
  serviceCenters,
  orderItems,
  addresses,
  product_color,
} from './schema';

async function seed() {
  try {
    const now = new Date();
    const saltRounds = 10;
    Logger.info('🌱 Seeding started...');

    // ==============================
    // ✅ USERS: Insert users with all roles
    // ==============================
    Logger.info('➡️  Deleting existing users...');
    await db.delete(warehouses);
    await db.delete(users);
    Logger.info('➡️  Inserting users...');
    const hashedPassword = await bcrypt.hash('password123', saltRounds);
    const userIds = await db
      .insert(users)
      .values([
        {
          name: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'admin',
          phone: '09123456789',
          isActive: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Staff User',
          email: 'staff@example.com',
          password: hashedPassword,
          role: 'staff',
          phone: '09234567890',
          isActive: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Customer User',
          email: 'customer@example.com',
          password: hashedPassword,
          role: 'customer',
          phone: '09345678901',
          isActive: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Business User',
          email: 'business@example.com',
          password: hashedPassword,
          role: 'business',
          phone: '09456789012',
          isActive: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Driver User',
          email: 'driver@example.com',
          password: hashedPassword,
          role: 'driver',
          phone: '09567890123',
          isActive: true,
          createdAt: now,
          updatedAt: now,
        },
        {
          name: 'Manager User',
          email: 'manager@example.com',
          password: hashedPassword,
          role: 'manager',
          phone: '09678901234',
          isActive: true,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .returning({ id: users.id });

    // Ensure userIds array is populated correctly
    if (!userIds || userIds.length !== 6) {
      throw new Error(
        'Failed to insert users or invalid number of users inserted.',
      );
    }

    // ==============================
    // ✅ ADDRESSES: Insert addresses
    // ==============================
    Logger.info('➡️  Deleting existing address...');
    await db.delete(addresses);
    Logger.info('➡️  Inserting addresses...');
    const region = 'Yangon';
    const township = 'Sanchaung';
    const { region: validRegion, township: validTownship } =
      getValidRegionAndTownship(region, township);
    const addressesIds = await db
      .insert(addresses)
      .values([
        {
          userId: userIds[2].id, // Customer User's ID
          type: 'home',
          street: 'No. 1, Street',
          city: 'Yangon',
          region: validRegion,
          township: validTownship,
          addressDetail: 'Near Pagoda',
          country: 'Myanmar',
          createdAt: now,
          updatedAt: now,
        },
      ])
      .returning({ id: addresses.id });

    // ==============================
    // ✅ WAREHOUSES: Insert warehouses
    // ==============================
    Logger.info('➡️  Deleting existing warehouses...');
    await db.delete(warehouses);
    Logger.info('➡️  Inserting warehouses...');
    const warehouseIds = await db
      .insert(warehouses)
      .values([
        {
          name: 'Yangon Warehouse',
          address: 'No. 123, Yangon Business District',
          region: 'Yangon',
          contact: '09123456789',
          managerId: userIds[5].id, // Manager User's ID
          isActive: true,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .returning({ id: warehouses.id });

    // ==============================
    // ✅ DRIVERS: Insert drivers
    // ==============================
    Logger.info('➡️  Deleting existing drivers...');
    await db.delete(drivers);
    Logger.info('➡️  Inserting drivers...');
    const driverIds = await db
      .insert(drivers)
      .values([
        {
          userId: userIds[4].id, // Driver User's ID
          licenseNumber: 'D123456',
          vehiclePlateNumber: 'ABC-123',
          isActive: true,
          orderLimit: 5,
          preferredRoutes: ['Yangon', 'Mandalay'],
          createdAt: now,
          updatedAt: now,
        },
      ])
      .returning({ id: drivers.id });

    // ==============================
    // ✅ COLORS: Insert colors
    // ==============================
    Logger.info('➡️  Deleting existing colors...');
    await db.delete(colors);
    Logger.info('➡️  Inserting colors...');
    const colorIds = await db
      .insert(colors)
      .values([
        { name: 'Black', hex: '#000000', createdAt: now, updatedAt: now },
      ])
      .returning({ id: colors.id });

    // ==============================
    // ✅ CATEGORIES: Insert categories
    // ==============================
    Logger.info('➡️  Deleting existing categories...');
    await db.delete(categories);
    Logger.info('➡️  Inserting categories...');
    const categoryIds = await db
      .insert(categories)
      .values([{ name: 'Laptops', createdAt: now, updatedAt: now }])
      .returning({ id: categories.id });

    // ==============================
    // ✅ PRODUCTS: Insert products
    // ==============================
    Logger.info('➡️  Deleting existing products...');
    await db.delete(products);
    Logger.info('➡️  Inserting products...');
    const productIds = await db
      .insert(products)
      .values([
        {
          name: 'MacBook Pro 16"',
          description: 'Apple M1 Max',
          priceUSD: '2399.00',
          priceMMK: '5000000',
          categoryId: categoryIds[0].id,
          brand: 'Apple',
          createdAt: now,
          updatedAt: now,
        },
      ])
      .returning({ id: products.id });

    // ==============================
    // ✅ PRODUCT COLORS: Insert product-color relationships
    // ==============================
    Logger.info('➡️  Deleting existing product-color relationships...');
    await db.delete(product_color);
    Logger.info('➡️  Inserting product colors...');
    await db.insert(product_color).values([
      {
        productId: productIds[0].id,
        colorId: colorIds[0].id,
        stock: 100,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // ==============================
    // ✅ ORDERS: Insert orders
    // ==============================
    Logger.info('➡️  Deleting existing orders...');
    await db.delete(orders);
    Logger.info('➡️  Inserting orders...');
    const orderIds = await db
      .insert(orders)
      .values([
        {
          userId: userIds[2].id, // Customer User's ID
          warehouseId: warehouseIds[0].id,
          status: 'pending',
          totalAmountUSD: '2399.0',
          totalAmountMMK: '5000000',
          deliveryAddressId: addressesIds[0].id,
          createdAt: now,
          updatedAt: now,
        },
      ])
      .returning({ id: orders.id });

    // ==============================
    // ✅ ORDER ITEMS: Insert order items
    // ==============================
    Logger.info('➡️  Deleting existing order items...');
    await db.delete(orderItems);
    Logger.info('➡️  Inserting order items...');
    await db.insert(orderItems).values([
      {
        orderId: orderIds[0].id,
        productId: productIds[0].id,
        quantity: 1,
        priceUSD: '2399.00',
        priceMMK: '5000000',
        colorId: colorIds[0].id,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // ==============================
    // ✅ INVOICES: Insert invoices
    // ==============================
    Logger.info('➡️  Deleting existing invoices...');
    await db.delete(invoices);
    Logger.info('➡️  Inserting invoices...');
    await db.insert(invoices).values([
      {
        orderId: orderIds[0].id,
        paymentType: 'cash_on_delivery',
        totalAmountUSD: '2399.0',
        totalAmountMMK: '5000000',
        paymentStatus: 'pending',
        issuedAt: now,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // ==============================
    // ✅ DELIVERIES: Insert deliveries
    // ==============================
    Logger.info('➡️  Deleting existing deliveries...');
    await db.delete(deliveries);
    Logger.info('➡️  Inserting deliveries...');
    await db.insert(deliveries).values([
      {
        orderId: orderIds[0].id,
        driverId: driverIds[0].id,
        deliveryRoute: [
          { location: 'Yangon Warehouse', sequence: 1 },
          { location: 'Customer Address, Yangon', sequence: 2 },
        ],
        status: 'pending',
        priority: 1,
        deliveryDate: new Date(Date.now() + 86400000),
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // ==============================
    // ✅ COMPLAINTS: Insert complaints
    // ==============================
    Logger.info('➡️  Deleting existing complaints...');
    await db.delete(complaints);
    Logger.info('➡️  Inserting complaints...');
    await db.insert(complaints).values([
      {
        orderId: orderIds[0].id,
        userId: userIds[2].id, // Customer User's ID
        issue: 'Received wrong color',
        status: 'pending',
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // ==============================
    // ✅ RETURNS
    // ==============================
    Logger.info('➡️  Deleting existing returns...');
    await db.delete(returns);
    Logger.info('➡️  Inserting returns...');
    await db.insert(returns).values([
      {
        orderId: orderIds[0].id,
        productId: productIds[0].id,
        colorId: colorIds[0].id,
        reason: 'Damaged item',
        processedBy: userIds[1].id, // Staff User's ID
        processedAt: new Date(),
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // ==============================
    // ✅ SERVICE CENTERS: Insert service centers
    // ==============================
    Logger.info('➡️  Deleting existing service centers...');
    await db.delete(serviceCenters);
    Logger.info('➡️  Inserting service centers...');
    await db.insert(serviceCenters).values([
      {
        name: 'Apple Service Center',
        address: 'Yangon Center',
        contact: '09123456789',
        region: 'Yangon',
        brandSpecialization: 'Apple',
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    Logger.info('✅ Seeding completed successfully!');
  } catch (error) {
    Logger.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seed()
  .then(() => process.exit(0))
  .catch((error) => {
    Logger.error('❌ Error during seeding:', error);
    process.exit(1);
  });
