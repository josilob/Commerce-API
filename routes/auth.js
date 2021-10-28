const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

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
		!user && res.status(401).json('Wrong credentials!');

		// extract pass and decode
		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.SECRET
		);
		const pass = hashedPassword.toString(CryptoJS.enc.Utf8);

		// check if passwords match
		pass !== req.body.password && res.status(401).json('Wrong credentials!');

		const JWToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin
			},
			process.env.JWT_SECRET,
			{ expiresIn: '24h' }
		);

		const { password, ...credentials } = user._doc;

		res.status(200).json({ ...credentials, JWToken });
	} catch (err) {
		res.json({ message: err.message });
	}
});

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.token;
	if (authHeader) {
		const token = authHeader.split(' ')[1];
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if (err) res.status(403).json('Token is not valid.');
			req.user = user;
			next();
		});
	} else {
		return res.status(401).json('You are not authenticated');
	}
};

const verifyTokenAndAuthorization = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.id === req.params.id || req.user.isAdmin) {
			next();
		} else {
			res.status(403).json('You are not authorized to perform this action.');
		}
	});
};

const verifyTokenAndAdmin = (req, res, next) => {
	verifyToken(req, res, () => {
		if (req.user.isAdmin) {
			next();
		} else {
			res.status(403).json('You are not authorized to perform this action.');
		}
	});
};

module.exports = {
	authRoute: router,
	verifyTokenAndAuthorization,
	verifyTokenAndAdmin
};
