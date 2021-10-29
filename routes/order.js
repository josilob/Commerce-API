const router = require('express').Router();
const Order = require('../models/Order');
const {
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
	verifyToken
} = require('./verify');

// Create Order
router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newOrder = new Order(req.body);
	try {
		const savedOrder = await newOrder.save();
		res.status(200).json(savedOrder);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get User's Orders
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
	try {
		const orders = await Order.find({ userId: req.params.userId });
		res.status(200).json(order);
	} catch (err) {
		res.status(500).json(err);
	}
});

// // Get all carts (as admin)
router.get('/', verifyTokenAndAdmin, async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Edit Order
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		);
		res.status(200).json(updatedOrder);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete order
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.id);
		res.status(200).json('Order deleted successfully!');
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
