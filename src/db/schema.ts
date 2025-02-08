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
  jsonb,
} from 'drizzle-orm/pg-core';

// ==============================
// ✅ ENUMS (Predefined Categories)
// ==============================

export const userRoleEnum = pgEnum('user_role', [
  'admin',
  'staff',
  'customer',
  'business',
  'driver',
]);

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]);

export const deliveryStatusEnum = pgEnum('delivery_status', [
  'pending',
  'in_transit',
  'delivered',
  'failed',
]);

export const complaintStatusEnum = pgEnum('complaint_status', [
  'pending',
  'resolved',
  'escalated',
]);

export const returnStatusEnum = pgEnum('return_status', [
  'pending',
  'processed',
  'rejected',
]);

export const stockStatusEnum = pgEnum('stock_status', [
  'in_stock',
  'out_of_stock',
  'reserved',
]);

export const paymentTypeEnum = pgEnum('payment_type', [
  'cash_on_delivery',
  'kbzpay',
  'wavepay',
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
});

// ==============================
// ✅ INVOICES TABLE
// ==============================
export const invoices = pgTable('invoices', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id'),
  paymentType: paymentTypeEnum('payment_type').default('cash_on_delivery'),
  totalAmountUSD: decimal('total_amount_usd', {
    precision: 10,
    scale: 2,
  }).notNull(),
  totalAmountMMK: decimal('total_amount_mmk', { precision: 10, scale: 2 }),
  paymentStatus: varchar('payment_status', { length: 50 }).default('pending'),
  issuedAt: timestamp('issued_at').defaultNow(),
  paidAt: timestamp('paid_at'),
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
  invoiceId: uuid('invoice_id'),
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
// ✅ WAREHOUSES TABLE
// ==============================
export const warehouses = pgTable('warehouses', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  address: text('address').notNull(),
  region: varchar('region', { length: 255 }).notNull(),
  contact: varchar('contact', { length: 255 }).notNull(),
  managerId: uuid('manager_id').references(() => users.id),
});

// ==============================
// ✅ COLORS TABLE
// ==============================
export const colors = pgTable('colors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  hex: varchar('hex', { length: 7 }).notNull(),
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
});

// ==============================
// ✅ PRODUCT_COLOR TABLE
// ==============================
export const product_color = pgTable('product_color', {
  productId: uuid('product_id')
    .references(() => products.id)
    .notNull(),
  colorId: uuid('color_id')
    .references(() => colors.id)
    .notNull(),
  stock: integer('stock').notNull(), // Total available stock
  reserved: integer('reserved').default(0), // Reserved stock for pending orders
  status: stockStatusEnum('status').default('in_stock'), // Current stock status
});

// ==============================
// ✅ CATEGORIES TABLE
// ==============================
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull().unique(),
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
  colorId: uuid('color_id')
    .references(() => colors.id)
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
  driverId: uuid('driver_id').references(() => drivers.id),
  deliveryRoute: text('delivery_route').notNull(),
  status: deliveryStatusEnum('status').default('pending'),
  priority: integer('priority').default(1),
  deliveryDate: timestamp('delivery_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ DRIVERS TABLE
// ==============================
export const drivers = pgTable('drivers', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  licenseNumber: varchar('license_number', { length: 255 }).notNull(),
  vehiclePlateNumber: varchar('vehicle_plate_number', {
    length: 255,
  }).notNull(),
  isActive: boolean('is_active').default(true),
  orderLimit: integer('order_limit').default(5),
  preferredRoutes: jsonb('preferred_routes').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ COMPLAINTS TABLE
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
  resolvedBy: uuid('resolved_by').references(() => users.id),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ==============================
// ✅ RETURNS TABLE
// ==============================
export const returns = pgTable('returns', {
  id: uuid('id').primaryKey().defaultRandom(),
  orderId: uuid('order_id')
    .references(() => orders.id)
    .notNull(),
  productId: uuid('product_id')
    .references(() => products.id)
    .notNull(),
  colorId: uuid('color_id')
    .references(() => colors.id)
    .notNull(),
  reason: text('reason').notNull(),
  status: returnStatusEnum('status').default('pending'),
  processedBy: uuid('processed_by').references(() => users.id),
  processedAt: timestamp('processed_at'),
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
