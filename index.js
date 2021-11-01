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

// Server routes
app.get('/', (req, res) => {
	res.json({ message: 'Marketplace backend home' });
});

const allowedOrigins = [
	'http://localhost:3000',
	'http://localhost:27017',
	'https://marketplace-srv.vercel.app'
];
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use((req, res, next) => {
	const origin = req.headers.origin;
	const theOrigin =
		allowedOrigins.indexOf(origin) >= 0 ? origin : allowedOrigins[0];
	res.header('Access-Control-Allow-Origin', theOrigin);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/checkout', orderRoute);

// App listening on port
app.listen(process.env.PORT || 27017, () =>
	console.log('Backend server listening on designated port ')
);
