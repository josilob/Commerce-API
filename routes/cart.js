const router = require('express').Router();
const Cart = require('../models/Cart');
const {
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin,
	verifyToken
} = require('./verify');

// Create Cart
router.post('/', verifyToken, async (req, res) => {
	const newCart = new Cart(req.body);
	try {
		const savedCart = await newCart.save();
		res.status(200).json(savedCart);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// // Get Cart
// router.get('/:id', async (req, res) => {
// 	try {
// 		const cart = await Cart.findById(req.params.id);
// 		res.status(200).json(cart);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get all products
// router.get('/', async (req, res) => {
// 	const queryNew = req.query.new;
// 	const queryCategory = req.query.category;
// 	try {
// 		let products;

// 		if (queryNew) {
// 			products = await Product.find().sort({ createdAt: -1 }).limit(5);
// 		} else if (queryCategory) {
// 			products = await Product.find({ categories: { $in: [queryCategory] } });
// 		} else {
// 			products = await Product.find();
// 		}

// 		res.status(200).json(products);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// Edit Cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
	try {
		const updatedCart = await Cart.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (err) {
		res.status(500).json(err);
	}
});

// // Delete user
// router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		await Cart.findByIdAndDelete(req.params.id);
// 		res.status(200).json('Cart deleted successfully!');
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = router;
