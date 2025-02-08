### **1. Domain Modeling**

#### **Main Entities**

- **Users**:

  - Attributes: `id`, `name`, `email`, `password`, `role`, `phone`, `address`, `businessName`, `serviceCenterId`
  - Relationships:
    - One-to-One: `serviceCenters` (via `serviceCenterId`)
    - One-to-One: `warehouses` (via `warehouseId`)
    - One-to-Many: `orders`, `complaints`, `deliveries`

- **Warehouses**:

  - Attributes: `id`, `name`, `address`, `region`, `contact`, `managerId`
  - Relationships:
    - Many-to-One: `users` (via `managerId`)
    - One-to-Many: `products`, `orders`

- **Categories**:

  - Attributes: `id`, `name`
  - Relationships:
    - One-to-Many: `products`

- **Products**:

  - Attributes: `id`, `name`, `description`, `priceUSD`, `priceMMK`, `categoryId`, `brand`, `stockQuantity`
  - Relationships:
    - Many-to-One: `categories` (via `categoryId`)
    - One-to-Many: `orderItems`, `returns`

- **Orders**:

  - Attributes: `id`, `userId`, `warehouseId`, `status`, `totalAmountUSD`, `totalAmountMMK`, `deliveryAddress`
  - Relationships:
    - Many-to-One: `users` (via `userId`)
    - Many-to-One: `warehouses` (via `warehouseId`)
    - One-to-Many: `orderItems`, `invoices`, `deliveries`, `returns`

- **Order Items**:

  - Attributes: `id`, `orderId`, `productId`, `quantity`, `priceUSD`, `priceMMK`
  - Relationships:
    - Many-to-One: `orders` (via `orderId`)
    - Many-to-One: `products` (via `productId`)

- **Deliveries**:

  - Attributes: `id`, `orderId`, `driverId`, `vehiclePlateNumber`, `deliveryRoute`, `status`
  - Relationships:
    - Many-to-One: `orders` (via `orderId`)
    - Many-to-One: `users` (via `driverId`)

- **Invoices**:

  - Attributes: `id`, `orderId`, `userId`, `amountUSD`, `amountMMK`, `currency`, `paymentStatus`
  - Relationships:
    - Many-to-One: `orders` (via `orderId`)
    - Many-to-One: `users` (via `userId`)

- **Service Centers**:

  - Attributes: `id`, `name`, `address`, `contact`, `region`, `brandSpecialization`
  - Relationships:
    - One-to-Many: `returns`

- **Returns**:
  - Attributes: `id`, `orderId`, `productId`, `serviceCenterId`, `reason`, `status`
  - Relationships:
    - Many-to-One: `orders` (via `orderId`)
    - Many-to-One: `products` (via `productId`)
    - Many-to-One: `serviceCenters` (via `serviceCenterId`)

---

### **2. Creating Use Cases**

#### **Key Use Cases**

1. **User Registration and Authentication**

   - Register a new user.
   - Login with email and password.
   - Logout.

2. **Order Management**

   - Create an order.
   - Update order status.
   - Cancel an order.

3. **Product Management**

   - Add new products.
   - Update product details.
   - Check stock availability.

4. **Delivery Management**

   - Assign delivery to a driver.
   - Update delivery status.
   - Track delivery route.

5. **Invoice Generation**

   - Generate invoice for an order.
   - Update payment status.

6. **Return Management**

   - Request a return.
   - Process the return at the service center.
   - Update return status.

7. **Complaint Handling**

   - File a complaint.
   - Resolve or escalate the complaint.

8. **Warehouse Operations**

   - Update stock levels.
   - Manage warehouse inventory.

9. **Service Center Operations**
   - Receive faulty products.
   - Repair or replace products.

---

### **3. Robustness Analysis**

#### **Key Components**

- **Boundary Objects**:

  - API Endpoints (e.g., `/api/orders`, `/api/products`)
  - User Interface (UI)

- **Control Objects**:

  - Business Logic (e.g., Order Processing, Delivery Assignment)
  - Validation Logic (e.g., Stock Availability, Payment Status)

- **Entity Objects**:
  - Users, Warehouses, Products, Orders, Deliveries, Invoices, Returns, Service Centers

---

### **4. Preliminary Design Review**

#### **Key Points**

- Ensure all entities are properly normalized.
- Validate relationships between tables (e.g., Foreign Keys).
- Confirm that all use cases are supported by the schema.
- Identify potential bottlenecks (e.g., Manual Stock Updates).

---

### **5. Sequence Diagramming**

#### **Example Sequence Diagram: Place an Order**

1. User → API: Submit order details.
2. API → Database: Validate stock availability.
3. Database → API: Return stock status.
4. API → Warehouse: Deduct stock.
5. API → Invoice: Generate invoice.
6. API → User: Confirm order placement.

---

### **6. Update Class Model**

#### **Updated Classes**

- **User**:

  - Methods: `register()`, `login()`, `logout()`

- **Order**:

  - Methods: `createOrder()`, `updateStatus()`, `cancelOrder()`

- **Product**:

  - Methods: `addProduct()`, `updateDetails()`, `checkStock()`

- **Delivery**:

  - Methods: `assignDriver()`, `updateStatus()`

- **Invoice**:

  - Methods: `generateInvoice()`, `updatePaymentStatus()`

- **Return**:
  - Methods: `requestReturn()`, `processReturn()`

---

### **7. Critical Design Review**

#### **Key Issues**

- Manual Processes: Stock updates, delivery tracking.
- Error Handling: Missing orders, wrong deliveries.
- Scalability: High volume of orders and complaints.

#### **Proposed Solutions**

- Automate stock updates using barcode scanners.
- Integrate GPS tracking for deliveries.
- Implement real-time notifications for order status.

---
