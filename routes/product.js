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
// // Get user
// router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
// 	try {
// 		const user = await User.findById(req.params.id);
// 		const { password, ...others } = user._doc;

// 		res.status(200).json(others);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Get all users
// router.get('/', verifyTokenAndAdmin, async (req, res) => {
// 	const query = req.query.new;
// 	try {
// 		const users = query
// 			? await User.find().sort({ _id: -1 }).limit(5)
// 			: await User.find();

// 		res.status(200).json(users);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Edit user
// router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
// 	if (req.body.password) {
// 		req.body.password = CryptoJS.AES.encrypt(
// 			req.body.password,
// 			process.env.SECRET
// 		).toString();
// 	}
// 	try {
// 		const updatedUser = await User.findByIdAndUpdate(
// 			req.params.id,
// 			{
// 				$set: req.body
// 			},
// 			{ new: true }
// 		);
// 		res.status(200).json(updatedUser);
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

// // Delete user
// router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
// 	try {
// 		await User.findByIdAndDelete(req.params.id);
// 		res.status(200).json('User deleted successfully!');
// 	} catch (err) {
// 		res.status(500).json(err);
// 	}
// });

module.exports = router;
