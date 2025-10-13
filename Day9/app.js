const express = require('express');
const userRoutes = require('./app/routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
