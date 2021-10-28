const router = require('express').Router();
const User = require('../models/User');

//REGISTER
router.post('/register', async (req, res) => {
	const { username, password, email } = req.body;

	const newUser = new User({
		username,
		email,
		password
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Login

module.exports = router;
