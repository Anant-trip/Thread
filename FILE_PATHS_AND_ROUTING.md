# 📁 Proper File Paths & Routing Configuration

**Project Root**: `d:\javaLarner\project\frontend\simulation\semulatio`

---

## 🗂️ PROPER FILE PATHS

### Backend Files

```
BACKEND ROOT
├── backend/server.js              ← Express server entry point
├── backend/app.js                 ← 3D App logic (Frontend - move to frontend/js/)
├── backend/models/
│   ├── User.js                   ← User schema
│   ├── Product.js                ← Product schema
│   ├── Cart.js                   ← Cart schema
│   └── Order.js                  ← Order schema
├── backend/routes/
│   ├── auth.js                   ← /api/auth/* endpoints
│   ├── products.js               ← /api/products/* endpoints
│   ├── cart.js                   ← /api/cart/* endpoints
│   └── orders.js                 ← /api/orders/* endpoints
└── backend/middleware/
    ├── auth.js                   ← Authentication middleware
    └── errorHandler.js           ← Error handling middleware
```

### Frontend Files

```
FRONTEND ROOT
├── frontend/pages/               ← HTML files
│   ├── index.html               ← Main page (butterfly animation)
│   ├── login.html               ← Login page
│   ├── cart.html                ← Shopping cart page
│   └── cart_orderd_costcheck.html
├── frontend/js/                 ← JavaScript files
│   ├── app.js                   ← Three.js 3D scene (MOVE FROM backend/app.js)
│   ├── auth.js                  ← Authentication logic (rename loginj.js)
│   ├── cart.js                  ← Cart logic
│   ├── basket.js                ← Basket functions
│   ├── spider.js                ← Utilities
│   ├── demo.js                  ← Demo content
│   └── script.js                ← General scripts
├── frontend/styles/             ← CSS files
│   ├── global.css               ← Global styles (consolidated)
│   ├── index.css                ← Main page styles
│   ├── login.css                ← Login page (from loginc.css)
│   ├── cart.css                 ← Cart styles (from buy.css)
│   └── animations.css           ← Animation tweaks
└── frontend/assets/             ← Resources
    ├── images/                  ← All PNG/JPG images
    │   ├── bg.png
    │   ├── logo.png
    │   ├── iconCart.png
    │   ├── checked_green.png
    │   ├── checked_red.png
    │   ├── fruit 1.png through fruit 10.png
    │   └── ... (all images)
    ├── models/                  ← 3D models
    │   ├── animated_butterfly.glb     ⭐ MAIN BUTTERFLY
    │   ├── lykan_hypersports_car.glb
    │   ├── bugatti_chiron_profilee.glb
    │   ├── supermarket_fruit.glb
    │   ├── champagne_set.obj
    │   ├── ulysses_butterfly.glb
    │   ├── demon_bee_full_texture.glb
    │   └── scene.gltf
    ├── videos/                  ← Video files
    │   └── 2583475-hd_1920_1080_24fps.mp4
    └── data/                    ← JSON data
        └── products.json
```

### Config Files (Root Level)

```
PROJECT ROOT
├── package.json                 ← Dependencies & scripts
├── .gitignore                   ← Git exclusions
├── .env                         ← Environment variables
└── server.js                    ← Main entry point (from backend/server.js)
```

---

## 🌐 EXPRESS ROUTING CONFIGURATION

### Updated `server.js` (Root Level)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE
// ============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// ============================================
// DATABASE CONNECTION
// ============================================
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/loginform',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.once('open', () => {
    console.log("✅ MongoDB connection successful");
});

db.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error);
});

// ============================================
// ROUTES
// ============================================

// Static file serving
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/login.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/cart.html'));
});

// API Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/products', require('./backend/routes/products'));
app.use('/api/cart', require('./backend/routes/cart'));
app.use('/api/orders', require('./backend/routes/orders'));

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

// ============================================
// START SERVER
// ============================================
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
    console.log(`📍 Main page: http://localhost:${port}/`);
    console.log(`🔐 Login: http://localhost:${port}/login`);
    console.log(`🛒 Cart: http://localhost:${port}/cart`);
});
```

---

## 📝 UPDATED FILE REFERENCES

### 1️⃣ Update `frontend/pages/index.html`

**Replace:**
```html
<link rel="stylesheet" href="style.css">
<script src="app.js"></script>
```

**With:**
```html
<link rel="stylesheet" href="/styles/global.css">
<link rel="stylesheet" href="/styles/index.css">
<script type="module" src="/js/app.js"></script>
```

---

### 2️⃣ Update `frontend/js/app.js`

**Replace:**
```javascript
loader.load('animated_butterfly.glb',
```

**With:**
```javascript
loader.load('/assets/models/animated_butterfly.glb',
```

**Replace all model paths:**
```javascript
// Replace:
loader.load('lykan_hypersports_car.glb')
// With:
loader.load('/assets/models/lykan_hypersports_car.glb')

// Replace:
loader.load('./bg.png')
// With:
loader.load('/assets/images/bg.png')
```

---

### 3️⃣ Update `frontend/pages/login.html`

**Replace:**
```html
<link rel="stylesheet" href="loginc.css">
<script src="loginj.js"></script>
```

**With:**
```html
<link rel="stylesheet" href="/styles/login.css">
<script src="/js/auth.js"></script>
```

---

### 4️⃣ Update `frontend/pages/cart.html`

**Replace:**
```html
<link rel="stylesheet" href="buy.css">
<script src="cart.js"></script>
<script src="basket.js"></script>
```

**With:**
```html
<link rel="stylesheet" href="/styles/cart.css">
<script src="/js/cart.js"></script>
<script src="/js/basket.js"></script>
```

---

## 📂 API ENDPOINT ROUTES

```javascript
// Authentication
POST   /api/auth/login          → Login user
POST   /api/auth/register       → Register new user
POST   /api/auth/logout         → Logout user
GET    /api/auth/profile        → Get user profile

// Products
GET    /api/products            → Get all products
GET    /api/products/:id        → Get single product
POST   /api/products            → Create product (admin)
PUT    /api/products/:id        → Update product (admin)
DELETE /api/products/:id        → Delete product (admin)

// Shopping Cart
GET    /api/cart                → Get user's cart
POST   /api/cart                → Add item to cart
PUT    /api/cart/:itemId        → Update cart item
DELETE /api/cart/:itemId        → Remove from cart
POST   /api/cart/checkout       → Checkout cart

// Orders
GET    /api/orders              → Get user's orders
GET    /api/orders/:id          → Get order details
POST   /api/orders              → Create order
PUT    /api/orders/:id          → Update order status
```

---

## 🔧 PACKAGE.JSON CONFIGURATION

```json
{
  "name": "ecommerce-3d-app",
  "version": "1.0.0",
  "description": "E-Commerce with 3D Butterfly Animation",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "dependencies": {
    "express": "^4.21.0",
    "mongoose": "^8.7.0",
    "passport": "^0.7.0",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^8.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.7"
  },
  "author": "",
  "license": "ISC"
}
```

---

## 🌍 ENVIRONMENT VARIABLES (.env)

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://127.0.0.1:27017/loginform

# Authentication
SESSION_SECRET=your_secret_key_here

# Debug
DEBUG=true
```

---

## 📊 CURRENT FILE ORGANIZATION STATUS

### ✅ Already Organized

```
✅ HTML files               → frontend/pages/
✅ CSS files               → frontend/styles/
✅ JavaScript files        → frontend/js/
✅ Images                  → frontend/assets/images/
✅ 3D Models               → frontend/assets/models/
✅ Videos                  → frontend/assets/videos/
✅ Backend structure       → backend/
```

### ⏳ Needs Update (File References)

```
⏳ app.js paths            → Update asset paths
⏳ HTML script tags        → Update src paths
⏳ HTML link tags          → Update href paths
⏳ CSS image references    → Update background-image paths
```

---

## 🚀 IMPLEMENTATION CHECKLIST

### Phase 5: Update File References

- [ ] Update `server.js` to new routing configuration
- [ ] Update `frontend/js/app.js` (butterfly model paths)
- [ ] Update `frontend/pages/index.html` (CSS/JS paths)
- [ ] Update `frontend/pages/login.html` (CSS/JS paths)
- [ ] Update `frontend/pages/cart.html` (CSS/JS paths)
- [ ] Rename and consolidate CSS files
- [ ] Rename `loginj.js` → `auth.js`
- [ ] Create `.env` file for configuration
- [ ] Test butterfly animation loads
- [ ] Test all pages load correctly

### Phase 6: Create Backend Routes

- [ ] Create `backend/routes/auth.js`
- [ ] Create `backend/routes/products.js`
- [ ] Create `backend/routes/cart.js`
- [ ] Create `backend/routes/orders.js`
- [ ] Create `backend/models/User.js`
- [ ] Create `backend/models/Product.js`
- [ ] Create `backend/models/Cart.js`
- [ ] Create `backend/models/Order.js`
- [ ] Create `backend/middleware/auth.js`
- [ ] Create `backend/middleware/errorHandler.js`

---

## 🧪 TESTING PATHS

### Test Static Files (Browser)
```
http://localhost:3000/              → index.html
http://localhost:3000/login         → login.html
http://localhost:3000/cart          → cart.html

http://localhost:3000/assets/images/bg.png
http://localhost:3000/assets/models/animated_butterfly.glb
http://localhost:3000/styles/global.css
http://localhost:3000/js/app.js
```

### Test API Endpoints (Terminal/Postman)
```bash
# Test auth endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass"}'

# Test products endpoint
curl http://localhost:3000/api/products
```

---

## ✨ QUICK SUMMARY

| Aspect | Path/Configuration |
|--------|-------------------|
| **Server Entry** | `server.js` (root) |
| **Backend Logic** | `backend/routes/` |
| **Frontend Pages** | `frontend/pages/` |
| **Styles** | `frontend/styles/` |
| **Scripts** | `frontend/js/` |
| **Images** | `frontend/assets/images/` |
| **3D Models** | `frontend/assets/models/` |
| **Videos** | `frontend/assets/videos/` |
| **Main Static** | Served from `frontend/` |
| **API Base** | `/api/` |
| **Butterfly Model** | `/assets/models/animated_butterfly.glb` |

