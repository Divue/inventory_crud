# Inventory Management System

A full-stack inventory management application built with **React**, **Vite**, **TailwindCSS**, **Node.js**, **Express**, and **MongoDB**. Provides complete CRUD operations for managing products in your inventory.

---

## ✨ Features

- **Product CRUD** — Create, Read, Update, Delete products
- **Dashboard** — Overview with total products, inventory value, low stock alerts
- **Search & Filter** — Search by name/SKU/supplier, filter by category
- **Form Validation** — Required fields, non-negative values, unique SKU
- **Low Stock Alerts** — Visual highlighting for items with quantity ≤ 5
- **Toast Notifications** — Success/error feedback on every action
- **Responsive UI** — Clean, modern interface with sidebar navigation
- **Seed Data** — Pre-populated database with 15 realistic products

---

## 🛠️ Tech Stack

| Layer    | Technology                                     |
| -------- | ---------------------------------------------- |
| Frontend | React 18, Vite 6, TailwindCSS 3, Axios, React Router DOM |
| Backend  | Node.js, Express 4, Mongoose 8, MongoDB        |
| Tools    | dotenv, cors, morgan                           |

---

## 📁 Folder Structure

```
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── productController.js
│   ├── data/
│   │   └── products.js
│   ├── middleware/
│   │   ├── errorMiddleware.js
│   │   └── notFoundMiddleware.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── seed/
│   │   └── seedProducts.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   ├── components/
│   │   │   ├── DashboardCards.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductTable.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Products.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **MongoDB** running locally or a MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone <repository-url>
cd xebia-assignment
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create or update `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory_management
```

### 3. Seed the Database

```bash
cd backend
npm run seed
```

### 4. Start the Backend

```bash
cd backend
npm run dev
```

Backend runs at: `http://localhost:5000`

### 5. Frontend Setup

```bash
cd frontend
npm install
```

Create or update `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 6. Start the Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/api/products`      | Get all products     |
| GET    | `/api/products/:id`  | Get single product   |
| POST   | `/api/products`      | Create a product     |
| PUT    | `/api/products/:id`  | Update a product     |
| DELETE | `/api/products/:id`  | Delete a product     |

---

## 📦 Scripts

### Backend

| Script          | Command          | Description                |
| --------------- | ---------------- | -------------------------- |
| `npm run dev`   | `node --watch`   | Start dev server (watch)   |
| `npm start`     | `node server.js` | Start production server    |
| `npm run seed`  | `node seed/...`  | Seed database with data    |

### Frontend

| Script          | Command        | Description            |
| --------------- | -------------- | ---------------------- |
| `npm run dev`   | `vite`         | Start dev server       |
| `npm run build` | `vite build`   | Build for production   |

---

## 📸 Screenshots

> _Add screenshots of the running application here._

| Dashboard | Products Page |
| --------- | ------------- |
| ![Dashboard](screenshots/dashboard.png) | ![Products](screenshots/products.png) |

---

## 🔮 Future Improvements

- Authentication & authorization (JWT)
- Role-based access control
- Product image upload
- Pagination & sorting
- Export to CSV/PDF
- Audit logs
- Multi-warehouse support
- Barcode/QR code scanning
- Real-time notifications (WebSocket)
- Unit & integration tests

---

## 📄 License

This project is for educational and assignment purposes.
