const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// route imports
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

// use parsers for requests
app.use(express.json()); // parse json bodies
app.use(express.urlencoded({ extended: false }));

// connection
mongoose
	.connect(`${process.env.DB_URI}`)
	.then(() => console.log('Successful connection'))
	.catch((err) => console.log(err.message));

// CORS ALLOWED DOMAINS
app.use(function (req, res, next) {
	const allowedDomains = [
		'http://localhost:3000',
		'https://marketplace-josilob.vercel.app'
	];
	const origin = req.headers.origin;
	if (allowedDomains.includes(origin))
		res.setHeader(('Access-Control-Allow-Origin', origin));
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type, Accept'
	);
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

// Server routes
app.get('/', (req, res) => {
	res.json({ message: 'Marketplace backend home' });
});
app.use(cors({ origin: '*' }));
app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/orders', orderRoute);
app.use('/checkout', stripeRoute);

// App listening on port
app.listen(process.env.PORT || 27017, () =>
	console.log('Backend server listening on designated port ')
);
