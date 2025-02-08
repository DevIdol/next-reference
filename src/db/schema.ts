import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
} from 'drizzle-orm/pg-core';

// ==============================
// ✅ ENUMS (Predefined Categories)
// ==============================

// User Role Enum
export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'staff',
  'customer',
  'business',
  'driver',
  'manager',
]);

// Order Status Enum
export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]);

// Delivery Status Enum
export const deliveryStatusEnum = pgEnum('delivery_status', [
  'pending',
  'in_transit',
  'delivered',
  'failed',
]);

// Complaint Status Enum
export const complaintStatusEnum = pgEnum('complaint_status', [
  'pending',
  'resolved',
  'escalated',
]);

// Return Status Enum
export const returnStatusEnum = pgEnum('return_status', [
  'pending',
  'processed',
  'rejected',
]);

// ==============================
// ✅ USERS TABLE
// ==============================
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull(),
  phone: varchar('phone', { length: 15 }),
  address: text('address'),
  businessName: varchar('business_name', { length: 255 }),
  serviceCenterId: uuid('service_center_id').references(
    () => serviceCenters.id,
  ),
});

// ==============================
// ✅ WAREHOUSES TABLE
// ==============================
export const warehouses = pgTable('warehouses', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  region: varchar('region', { length: 255 }).notNull(),
  contact: varchar('contact', { length: 255 }).notNull(),
  managerId: uuid('manager_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ CATEGORIES TABLE
// ==============================
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
});

// ==============================
// ✅ PRODUCTS TABLE
// ==============================
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  priceUSD: decimal('price_usd', { precision: 10, scale: 2 }).notNull(),
  priceMMK: decimal('price_mmk', { precision: 10, scale: 2 }),
  categoryId: uuid('category_id').references(() => categories.id),
  brand: varchar('brand', { length: 255 }).notNull(),
  stockQuantity: integer('stock_quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ ORDERS TABLE
// ==============================
export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  warehouseId: uuid('warehouse_id')
    .references(() => warehouses.id)
    .notNull(),
  status: orderStatusEnum('status').default('pending'),
  totalAmountUSD: decimal('total_amount_usd', {
    precision: 10,
    scale: 2,
  }).notNull(),
  totalAmountMMK: decimal('total_amount_mmk', { precision: 10, scale: 2 }),
  deliveryAddress: text('delivery_address').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ ORDER ITEMS TABLE
// ==============================
export const orderItems = pgTable('order_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  productId: uuid('product_id')
    .references(() => products.id)
    .notNull(),
  quantity: integer('quantity').notNull(),
  priceUSD: decimal('price_usd', { precision: 10, scale: 2 }).notNull(),
  priceMMK: decimal('price_mmk', { precision: 10, scale: 2 }),
});

// ==============================
// ✅ DELIVERIES TABLE
// ==============================
export const deliveries = pgTable('deliveries', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  driverId: uuid('driver_id')
    .references(() => users.id)
    .notNull(),
  vehiclePlateNumber: varchar('vehicle_plate_number', {
    length: 255,
  }).notNull(),
  deliveryRoute: text('delivery_route').notNull(),
  status: deliveryStatusEnum('status').default('pending'),
  deliveryDate: timestamp('delivery_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ INVOICES TABLE
// ==============================
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  amountUSD: decimal('amount_usd', { precision: 10, scale: 2 }).notNull(),
  amountMMK: decimal('amount_mmk', { precision: 10, scale: 2 }),
  currency: varchar('currency', { length: 10 }).default('USD'),
  paymentStatus: varchar('payment_status', { length: 50 }).default('pending'),
  issuedAt: timestamp('issued_at').defaultNow(),
  paidAt: timestamp('paid_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ SERVICE CENTERS TABLE
// ==============================
export const serviceCenters = pgTable('service_centers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  contact: varchar('contact', { length: 255 }).notNull(),
  region: varchar('region', { length: 255 }).notNull(),
  brandSpecialization: varchar('brand_specialization', { length: 255 }),
  registeredAt: timestamp('registered_at').defaultNow(),
  isActive: boolean('is_active').default(true),
});

// ==============================
// ✅ COMPLAIN TABLE
// ==============================
export const complaints = pgTable('complaints', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  issue: text('issue').notNull(),
  status: complaintStatusEnum('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ STOCK RECORD TABLE
// ==============================

export const dailyStockRecords = pgTable('daily_stock_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  date: timestamp('date').notNull(),
  warehouseBranch: varchar('warehouse_branch', { length: 255 }).notNull(),
  category: varchar('category', { length: 255 }).notNull(),
  model: varchar('model', { length: 255 }).notNull(),
  openingBalance: integer('opening_balance').notNull(),
  in: integer('in').notNull(),
  out: integer('out').notNull(),
  closingBalance: integer('closing_balance').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ RETURN TABLE
// ==============================

export const returns = pgTable('returns', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  productId: uuid('product_id')
    .references(() => products.id)
    .notNull(),
  serviceCenterId: uuid('service_center_id')
    .references(() => serviceCenters.id)
    .notNull(),
  reason: text('reason').notNull(),
  status: returnStatusEnum('status').default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});
