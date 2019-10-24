const express = require('express');
const router = express.Router(); // create a router object to handle routes

const { checkAuth } = require('./../utils/auth');
const OrderController = require('./../controllers/orders');

// get all orders
router.get('/', checkAuth, OrderController.getAllOrders);

// add a new order
router.post('/', checkAuth, OrderController.createNewOrder);

// get a single order
router.get('/:orderId', checkAuth, OrderController.getOrder);

router.patch('/:orderId', checkAuth, OrderController.updateOrder);

// delete an order
router.delete('/:orderId', checkAuth, OrderController.deleteOrder);

module.exports = router;
