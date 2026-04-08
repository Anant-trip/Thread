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

// Serve static files from frontend (CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'frontend')));

// ============================================
// DATABASE CONNECTION
// ============================================
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("✅ MongoDB connection successful");
});

db.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error);
});

// ============================================
// ROUTES - Static Pages
// ============================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/login.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/pages/cart.html'));
});

// ============================================
// ROUTES - API (Add these after creating route files)
// ============================================

// Uncomment after creating route files
// app.use('/api/auth', require('./backend/routes/auth'));
// app.use('/api/products', require('./backend/routes/products'));
// app.use('/api/cart', require('./backend/routes/cart'));
// app.use('/api/orders', require('./backend/routes/orders'));

// ============================================
// ERROR HANDLERS
// ============================================

// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error Handler
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

module.exports = app;
