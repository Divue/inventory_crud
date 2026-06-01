# Inventory Management System

A full-stack web application for managing product inventory with complete CRUD operations. Built with React, Node.js, Express, and MongoDB.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Screenshots](#screenshots)

---

## Tech Stack

**Frontend:** React 18, Vite, TailwindCSS, Axios, React Router DOM  
**Backend:** Node.js, Express.js, Mongoose, MongoDB  
**Utilities:** dotenv, cors, morgan

---

## Project Structure

```
inventory-management/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── productController.js   # Request handlers
│   ├── data/
│   │   └── products.js            # Seed data
│   ├── middleware/
│   │   ├── errorMiddleware.js     # Centralized error handler
│   │   └── notFoundMiddleware.js  # 404 handler
│   ├── models/
│   │   └── Product.js             # Mongoose schema
│   ├── routes/
│   │   └── productRoutes.js       # API route definitions
│   ├── seed/
│   │   └── seedProducts.js        # Database seed script
│   ├── .env                       # Environment variables
│   ├── package.json
│   └── server.js                  # Application entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js           # Axios instance
│   │   ├── components/
│   │   │   ├── DashboardCards.jsx  # Statistics cards
│   │   │   ├── Loader.jsx         # Loading spinner
│   │   │   ├── ProductForm.jsx    # Create/Edit form modal
│   │   │   ├── ProductTable.jsx   # Product data table
│   │   │   └── Sidebar.jsx        # Navigation sidebar
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Dashboard page
│   │   │   └── Products.jsx       # Products management page
│   │   ├── App.jsx                # Root component
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # React entry point
│   ├── .env                       # Frontend environment variables
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## Prerequisites

- Node.js v18 or higher
- MongoDB (local instance or Atlas)
- npm

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/Divue/inventory_crud.git
cd inventory_crud
```

**2. Install backend dependencies**

```bash
cd backend
npm install
```

**3. Install frontend dependencies**

```bash
cd frontend
npm install
```

---

## Environment Variables

**Backend** — `backend/.env`

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory_DB
```

**Frontend** — `frontend/.env`

```
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Database Seeding

The seed script clears existing products and inserts sample data.

```bash
cd backend
npm run seed
```

Output:

```
✅ MongoDB Connected: localhost
🗑️  Cleared 0 existing products
✅ Successfully seeded 6 products
🎉 Database seeding completed!
```

---

## Running the Application

Start the backend and frontend in separate terminals.

**Terminal 1 — Backend (port 5000)**

```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend (port 5173)**

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in the browser.

---

## API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint           | Description         |
|--------|--------------------|---------------------|
| GET    | `/products`        | Get all products    |
| GET    | `/products/:id`    | Get product by ID   |
| POST   | `/products`        | Create new product  |
| PUT    | `/products/:id`    | Update product      |
| DELETE | `/products/:id`    | Delete product      |

### Request Body (POST / PUT)

```json
{
  "name": "Wireless Mouse",
  "sku": "WM-1001",
  "category": "Electronics",
  "quantity": 120,
  "price": 29.99,
  "supplier": "Logitech India",
  "description": "Ergonomic wireless mouse with USB receiver."
}
```

### Response Format

```json
{
  "success": true,
  "data": { ... }
}
```

### Validation Rules

| Field       | Rule                        |
|-------------|-----------------------------|
| name        | Required, max 100 chars     |
| sku         | Required, unique, uppercase |
| category    | Required, max 50 chars      |
| quantity    | Required, min 0             |
| price       | Required, min 0             |
| supplier    | Required, max 100 chars     |
| description | Optional, max 500 chars     |

### Error Response

```json
{
  "success": false,
  "message": "Product not found"
}
```

---

## Features

- **Dashboard** — Total products, inventory value, low stock count, category count
- **Product Table** — View all products with search and category filter
- **CRUD Operations** — Add, edit, and delete products via modal form
- **Low Stock Alerts** — Visual highlighting for products with quantity ≤ 5
- **Form Validation** — Client and server-side validation on all fields
- **Toast Notifications** — Success and error feedback on every action
- **Responsive Layout** — Sidebar navigation with clean, minimal UI

---

## Available Scripts

**Backend**

| Script         | Command                     |
|----------------|-----------------------------|
| `npm run dev`  | Start server with file watch |
| `npm start`    | Start server (production)    |
| `npm run seed` | Seed the database            |

**Frontend**

| Script          | Command              |
|-----------------|----------------------|
| `npm run dev`   | Start Vite dev server |
| `npm run build` | Build for production  |
