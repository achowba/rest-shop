const express = require('express');
const router = express.Router(); // create a router object to handle routes

const { upload } = require('./../utils/fileupload');
const { checkAuth } = require('./../utils/auth'); // middleware to check if user is authenticated i.e logged in (Pass token in request header to authenticate user)

const ProductController = require('./../controllers/products');

// get all products
router.get('/', ProductController.getAllProducts);

// post/add a product
router.post('/', checkAuth, upload.single('productImage'), ProductController.createProduct);

// get a single product
router.get('/:productId', ProductController.getProduct);

// update a product
router.patch('/:productId', checkAuth, ProductController.updateProduct);

// delete a product
router.delete('/:productId', checkAuth, ProductController.deleteProduct);

module.exports = router;
