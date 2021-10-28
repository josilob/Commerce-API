const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
require('dotenv').config();

//Register
router.post('/register', async (req, res) => {
	const { username, password, email } = req.body;

	const newUser = new User({
		username,
		email,
		password: CryptoJS.AES.encrypt(password, process.env.SECRET).toString()
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Login
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(401).json('Wrong credentials');

		const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
		const pass = hashedPass.toString(CryptoJS.enc.Utf8);

		pass !== req.body.password && res.status(401).json('Wrong credentials');

		const { password, ...otherCredentials } = user._doc;

		res.status(200).json(otherCredentials);
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
