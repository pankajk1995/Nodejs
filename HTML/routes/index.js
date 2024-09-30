const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const contactController = require('../controllers/contactController');

// Home page
router.get('/', (req, res) => {
  res.render('home');
});

// About page
router.get('/about', (req, res) => {
  res.render('about');
});

// Contact page
router.get('/contact', contactController.getContactPage);
router.post('/contact', contactController.submitContactForm);

// Products page
router.get('/products', productController.getProducts);
router.post('/add', productController.addProduct);

module.exports = router;
