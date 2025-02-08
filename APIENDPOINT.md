## **🌟 1. User Authentication API** (`/api/auth`)

| **Method** | **Endpoint**         | **Description**              |
| ---------- | -------------------- | ---------------------------- |
| `POST`     | `/api/auth/register` | Register a new user          |
| `POST`     | `/api/auth/login`    | Login and generate JWT       |
| `GET`      | `/api/auth/me`       | Get current user (protected) |
| `POST`     | `/api/auth/logout`   | Logout user                  |
| `GET`      | `/api/auth/users`    | Get all users (Admin only)   |

#### **Example Payload (Register)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "customer"
}
```

#### **Response**

```json
{
  "message": "User registered successfully",
  "user": { "id": "123", "name": "John Doe", "email": "john@example.com" }
}
```

---

## **🛒 2. Product Management API** (`/api/products`)

| **Method** | **Endpoint**        | **Description**                   |
| ---------- | ------------------- | --------------------------------- |
| `POST`     | `/api/products`     | Create a new product (Admin only) |
| `GET`      | `/api/products`     | Get all products                  |
| `GET`      | `/api/products/:id` | Get product by ID                 |
| `PUT`      | `/api/products/:id` | Update product (Admin only)       |
| `DELETE`   | `/api/products/:id` | Delete product (Admin only)       |

#### **Example Payload (Create Product)**

```json
{
  "name": "Dell XPS 13",
  "description": "Powerful ultrabook",
  "priceUSD": 1500,
  "categoryId": "abc123",
  "brand": "Dell",
  "stockQuantity": 10
}
```

---

## **📦 3. Orders API** (`/api/orders`)

| **Method** | **Endpoint**      | **Description**                  |
| ---------- | ----------------- | -------------------------------- |
| `POST`     | `/api/orders`     | Create a new order               |
| `GET`      | `/api/orders`     | Get all orders (Admin only)      |
| `GET`      | `/api/orders/:id` | Get order by ID                  |
| `PUT`      | `/api/orders/:id` | Update order status (Admin only) |
| `DELETE`   | `/api/orders/:id` | Cancel an order                  |

#### **Example Payload (Create Order)**

```json
{
  "userId": "user123",
  "warehouseId": "warehouse456",
  "totalAmountUSD": 2000,
  "deliveryAddress": "Yangon, Myanmar",
  "items": [{ "productId": "prod123", "quantity": 2, "priceUSD": 1000 }]
}
```

---

## **🏢 4. Warehouse Management API** (`/api/warehouses`)

| **Method** | **Endpoint**          | **Description**                     |
| ---------- | --------------------- | ----------------------------------- |
| `POST`     | `/api/warehouses`     | Create a new warehouse (Admin only) |
| `GET`      | `/api/warehouses`     | Get all warehouses                  |
| `GET`      | `/api/warehouses/:id` | Get warehouse by ID                 |
| `PUT`      | `/api/warehouses/:id` | Update warehouse (Admin only)       |
| `DELETE`   | `/api/warehouses/:id` | Delete warehouse (Admin only)       |

#### **Example Payload (Create Warehouse)**

```json
{
  "name": "Dawbon Branch",
  "address": "Dawbon, Yangon",
  "region": "Yangon",
  "contact": "09-xxxxxxx"
}
```

---

## **🚚 5. Delivery Tracking API** (`/api/deliveries`)

| **Method** | **Endpoint**          | **Description**                        |
| ---------- | --------------------- | -------------------------------------- |
| `POST`     | `/api/deliveries`     | Assign driver to delivery (Admin only) |
| `GET`      | `/api/deliveries`     | Get all deliveries                     |
| `GET`      | `/api/deliveries/:id` | Get delivery by ID                     |
| `PUT`      | `/api/deliveries/:id` | Update delivery status (Driver only)   |

#### **Example Payload (Create Delivery)**

```json
{
  "orderId": "order123",
  "driverId": "driver456",
  "vehiclePlateNumber": "YGN-1234",
  "deliveryRoute": "Yangon > Mandalay",
  "status": "in_transit"
}
```

---

## **💳 6. Invoices API** (`/api/invoices`)

| **Method** | **Endpoint**        | **Description**       |
| ---------- | ------------------- | --------------------- |
| `POST`     | `/api/invoices`     | Generate an invoice   |
| `GET`      | `/api/invoices`     | Get all invoices      |
| `GET`      | `/api/invoices/:id` | Get invoice by ID     |
| `PUT`      | `/api/invoices/:id` | Update payment status |

#### **Example Payload (Create Invoice)**

```json
{
  "orderId": "order123",
  "userId": "user456",
  "amountUSD": 2000,
  "currency": "USD",
  "paymentStatus": "pending"
}
```

---

## **🛠️ 7. Admin & Staff API** (`/api/admin`)

| **Method** | **Endpoint**           | **Description**                 |
| ---------- | ---------------------- | ------------------------------- |
| `GET`      | `/api/admin/stats`     | Get platform stats (Admin only) |
| `GET`      | `/api/admin/users`     | Get all users (Admin only)      |
| `PUT`      | `/api/admin/users/:id` | Update user role (Admin only)   |
| `DELETE`   | `/api/admin/users/:id` | Delete a user (Admin only)      |

---

## **⚡ 8. Utility Endpoints**

| **Method** | **Endpoint**   | **Description**  |
| ---------- | -------------- | ---------------- |
| `GET`      | `/api/health`  | Check API health |
| `GET`      | `/api/version` | Get API version  |

---

## **🏥 9. Service Center API** (`/api/service-centers`)

| **Method** | **Endpoint**               | **Description**                     |
| ---------- | -------------------------- | ----------------------------------- |
| `POST`     | `/api/service-centers`     | Create a new service center (Admin) |
| `GET`      | `/api/service-centers`     | Get all service centers             |
| `GET`      | `/api/service-centers/:id` | Get service center by ID            |
| `PUT`      | `/api/service-centers/:id` | Update service center (Admin)       |
| `DELETE`   | `/api/service-centers/:id` | Delete service center (Admin)       |

#### **Example Payload (Create Service Center)**

```json
{
  "name": "Tech Repair Hub",
  "address": "Mandalay, Myanmar",
  "contact": "09-123456789",
  "region": "Mandalay",
  "brandSpecialization": "Dell, HP, Lenovo",
  "isActive": true
}
```

---

## **📌 Updated API Structure (Including Service Centers)**

```
/api
├── auth/
│   ├── register (POST)
│   ├── login (POST)
│   ├── me (GET)
│   ├── logout (POST)
│   ├── users (GET - Admin)
│
├── products/
│   ├── (POST, GET, GET:id, PUT:id, DELETE:id)
│
├── orders/
│   ├── (POST, GET, GET:id, PUT:id, DELETE:id)
│
├── warehouses/
│   ├── (POST, GET, GET:id, PUT:id, DELETE:id)
│
├── deliveries/
│   ├── (POST, GET, GET:id, PUT:id)
│
├── invoices/
│   ├── (POST, GET, GET:id, PUT:id)
│
├── service-centers/
│   ├── (POST, GET, GET:id, PUT:id, DELETE:id)
│
├── admin/
│   ├── stats (GET)
│   ├── users (GET, PUT:id, DELETE:id)
│
└── utility/
    ├── health (GET)
    ├── version (GET)
```

### **Summary of Relationships**

| **Table**           | **Related Table** | **Relationship Type** |
| ------------------- | ----------------- | --------------------- |
| `users`             | `serviceCenters`  | One-to-One            |
| `users`             | `warehouses`      | One-to-One            |
| `users`             | `orders`          | One-to-Many           |
| `users`             | `complaints`      | One-to-Many           |
| `users`             | `deliveries`      | One-to-Many           |
| `warehouses`        | `products`        | One-to-Many           |
| `warehouses`        | `orders`          | One-to-Many           |
| `categories`        | `products`        | One-to-Many           |
| `products`          | `orderItems`      | One-to-Many           |
| `products`          | `returns`         | One-to-Many           |
| `orders`            | `orderItems`      | One-to-Many           |
| `orders`            | `invoices`        | One-to-One            |
| `orders`            | `deliveries`      | One-to-One            |
| `orders`            | `returns`         | One-to-One            |
| `orders`            | `complaints`      | One-to-One            |
| `orderItems`        | `products`        | One-to-One            |
| `deliveries`        | `orders`          | One-to-One            |
| `deliveries`        | `users`           | One-to-One            |
| `complaints`        | `users`           | One-to-One            |
| `complaints`        | `orders`          | One-to-One            |
| `returns`           | `orders`          | One-to-One            |
| `returns`           | `products`        | One-to-One            |
| `returns`           | `serviceCenters`  | One-to-One            |
| `invoices`          | `orders`          | One-to-One            |
| `invoices`          | `users`           | One-to-One            |
| `dailyStockRecords` | `warehouses`      | One-to-Many           |
| `dailyStockRecords` | `products`        | One-to-Many           |

---
