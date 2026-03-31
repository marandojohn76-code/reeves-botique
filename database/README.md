# Reeves Boutique Database

## Stack
- **Database**: SQLite (via `better-sqlite3`)
- **API**: Node.js + Express

## Tables
| Table | Description |
|---|---|
| `admins` | Admin login credentials |
| `products` | All 56 products across 7 categories |
| `customers` | Customer details captured at order time |
| `orders` | Customer orders with status tracking |
| `order_items` | Individual items per order |
| `stk_transactions` | M-Pesa STK Push payment records |
| `newsletter_subscribers` | Email subscribers |

## Setup & Run

```bash
# Install dependencies
npm install

# Initialize database + seed 56 products (auto-runs on first start)
npm run setup-db

# Start the API server (port 3001)
npm run server
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | All products |
| GET | `/api/products?category=Shoes` | Filter by category |
| POST | `/api/products` | Add product (admin) |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Remove product |
| GET | `/api/orders` | All orders (admin) |
| GET | `/api/orders/:id` | Single order |
| POST | `/api/orders` | Place new order |
| PATCH | `/api/orders/:id` | Update order status |
| GET | `/api/stk` | All STK transactions |
| POST | `/api/stk` | Record STK push |
| PATCH | `/api/stk/:id` | Update STK status |
| POST | `/api/admin/login` | Admin login |
| POST | `/api/newsletter` | Subscribe email |

## Default Admin Credentials
- **Username**: `admin`
- **Password**: `reeves001!`
