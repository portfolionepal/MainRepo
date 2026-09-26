# Backend API & Database Plan

## Overview
This document outlines the backend architecture, database schema, and RESTful APIs required for the Kriti Print & Pack Industries website. The backend will serve dynamic content to the frontend and provide a secure admin panel for content management.

**Tech Stack:**
- Node.js & Express
- Prisma ORM
- MySQL Database
- JWT (JSON Web Tokens) for Admin Authentication

---

## 1. Database Schema (Prisma)

We will use Prisma with a MySQL database. Below are the required models based on the current frontend structure.

### 1.1 Admin Authentication
Only admins will use the system to manage content.
```prisma
model AdminUser {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String   // Hashed password (e.g., using bcrypt)
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 1.2 Home Section: Company Stats
Dynamic stats shown on the homepage (e.g., 15+ Years of Experience).
```prisma
model CompanyStat {
  id        Int      @id @default(autoincrement())
  value     String   // e.g., "15+" or "500+"
  label     String   // e.g., "Years of Experience"
  order     Int      @default(0) // For sorting on the frontend
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 1.3 Products
Manages the product catalog.
```prisma
model Product {
  id               Int      @id @default(autoincrement())
  slug             String   @unique
  name             String
  shortDescription String   @db.Text
  description      String   @db.Text
  image            String
  category         String   // e.g., 'corrugated-boxes', 'fmcg-packaging'
  isFeatured       Boolean  @default(false)
  specifications   Json?    // Key-value pairs of specs
  features         Json     // Array of feature strings
  applications     Json     // Array of application strings
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

### 1.4 Services
Manages the services offered.
```prisma
model Service {
  id               Int      @id @default(autoincrement())
  slug             String   @unique
  name             String
  shortDescription String   @db.Text
  description      String   @db.Text
  image            String
  icon             String   // Lucide icon name (e.g., 'PenTool')
  isFeatured       Boolean  @default(false)
  process          Json     // Array of objects: [{ step, title, description }]
  benefits         Json     // Array of strings
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}
```

### 1.5 Portfolio (Projects)
Manages past projects and case studies.
```prisma
model Portfolio {
  id              Int      @id @default(autoincrement())
  slug            String   @unique
  title           String
  client          String
  category        String   // e.g., 'fmcg', 'food-beverage'
  description     String   @db.Text
  fullDescription String   @db.Text
  image           String
  tags            Json     // Array of strings
  year            String
  isFeatured      Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

### 1.6 Why Choose Us
Manages the key reasons why clients choose the company.
```prisma
model WhyChooseUs {
  id          Int      @id @default(autoincrement())
  title       String
  description String   @db.Text
  icon        String   // Lucide icon name (e.g., 'Award', 'Clock')
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 1.7 Industries We Serve
Manages the industries the company caters to.
```prisma
model Industry {
  id          Int      @id @default(autoincrement())
  slug        String   @unique
  name        String
  description String   @db.Text
  icon        String   // Lucide icon name
  image       String?
  products    Json     // Array of string labels
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### 1.8 Contact Information
A single record to manage company-wide contact details.
```prisma
model ContactInfo {
  id           Int      @id @default(autoincrement())
  name         String
  address      String
  phone        String
  mobile       String
  email        String
  mapUrl       String
  facebookUrl  String?
  twitterUrl   String?
  linkedinUrl  String?
  workingHours String
  updatedAt    DateTime @updatedAt
}
```

---

## 2. API Endpoints Plan

All admin routes (`POST`, `PUT`, `DELETE`) will be protected by a JWT authentication middleware. Public routes (`GET`) will be open for the frontend to fetch data.

### 2.1 Auth APIs
- `POST /api/admin/login` - Authenticate admin and return JWT.
- `POST /api/admin/register` - Create initial admin (should be secured or run once).
- `GET /api/admin/me` - Get current admin info using token.

### 2.2 Company Stats APIs
- `GET /api/stats` - Get all stats.
- `POST /api/stats` (Admin) - Create a new stat.
- `PUT /api/stats/:id` (Admin) - Update a stat.
- `DELETE /api/stats/:id` (Admin) - Delete a stat.

### 2.3 Products APIs
- `GET /api/products` - Get all products (with optional filtering by category or featured).
- `GET /api/products/:slug` - Get a single product by slug.
- `POST /api/products` (Admin) - Create a new product.
- `PUT /api/products/:id` (Admin) - Update a product.
- `DELETE /api/products/:id` (Admin) - Delete a product.

### 2.4 Services APIs
- `GET /api/services` - Get all services.
- `GET /api/services/:slug` - Get a single service.
- `POST /api/services` (Admin) - Create a new service.
- `PUT /api/services/:id` (Admin) - Update a service.
- `DELETE /api/services/:id` (Admin) - Delete a service.

### 2.5 Portfolio APIs
- `GET /api/portfolio` - Get all portfolio items.
- `GET /api/portfolio/:slug` - Get a single portfolio item.
- `POST /api/portfolio` (Admin) - Create a new portfolio item.
- `PUT /api/portfolio/:id` (Admin) - Update a portfolio item.
- `DELETE /api/portfolio/:id` (Admin) - Delete a portfolio item.

### 2.6 Why Choose Us APIs
- `GET /api/why-choose-us` - Get all reasons.
- `POST /api/why-choose-us` (Admin) - Create a new reason.
- `PUT /api/why-choose-us/:id` (Admin) - Update a reason.
- `DELETE /api/why-choose-us/:id` (Admin) - Delete a reason.

### 2.7 Industries APIs
- `GET /api/industries` - Get all industries.
- `GET /api/industries/:slug` - Get a single industry.
- `POST /api/industries` (Admin) - Create an industry.
- `PUT /api/industries/:id` (Admin) - Update an industry.
- `DELETE /api/industries/:id` (Admin) - Delete an industry.

### 2.8 Contact Info APIs
- `GET /api/contact` - Get the contact info (returns the single record).
- `PUT /api/contact` (Admin) - Update the contact info (upserts the first record).

## 3. Next Steps for Implementation
1. **Update Prisma Schema**: Replace the dummy schema in `backend/prisma/schema.prisma` with the new models outlined above.
2. **Database Migration**: Run `npx prisma migrate dev` to sync the MySQL database.
3. **Setup Dependencies**: Install `bcrypt` for password hashing and `jsonwebtoken` for auth token generation.
4. **Implement Controllers & Routes**: Build the Express routes and Prisma queries for all models.
5. **Add Error Handling & Validation**: Implement a global error handler and input validation.
6. **Testing**: Test APIs via Postman or Bruno.
7. **Frontend Integration**: Replace static dummy data in the Next.js frontend with data fetched from these APIs.
