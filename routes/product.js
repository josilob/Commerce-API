const router = require('express').Router();
const Product = require('../models/Product');
const {
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin
} = require('./verify');

// Create Product
router.post('/', verifyTokenAndAdmin, async (req, res) => {
	const newProduct = new Product(req.body);

	try {
		const savedProduct = await newProduct.save();
		res.status(200).json(savedProduct);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Get Product
router.get('/:id', async (req, res) => {
	try {
		const product = await User.findById(req.params.id);
		res.status(200).json(product);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get all products
router.get('/', async (req, res) => {
	const queryNew = req.query.new;
	const queryCategory = req.query.category;
	try {
		let products;

		if (queryNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(5);
		} else if (queryCategory) {
			products = await Product.find({ categories: { $in: [queryCategory] } });
		} else {
			products = await Product.find();
		}

		res.status(200).json(products);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Edit Product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete user
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
	try {
		await Product.findByIdAndDelete(req.params.id);
		res.status(200).json('Product deleted successfully!');
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
