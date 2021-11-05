const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

// route imports
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');

// connection
mongoose
	.connect(`${process.env.DB_URI}`)
	.then(() => console.log('Successful connection'))
	.catch((err) => console.log(err.message));

const headers = (req, res, next) => {
	const origin = req.headers.origin;

	if (
		origin == 'http://localhost:3000' ||
		origin == 'https://marketplace-josilob.vercel.app'
	)
		res.setHeader('Access-Control-Allow-Origin', origin);

	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
};

// use parser for requests
app.use(express.json()); // parse json bodies

// Server routes
app.get('/', (req, res) => {
	res.json({ message: 'Marketplace backend home' });
});
app.use('/users', headers, userRoute);
app.use('/auth', headers, authRoute);
app.use('/products', headers, productRoute);
app.use('/cart', headers, cartRoute);
app.use('/orders', headers, orderRoute);
app.use('/checkout', headers, stripeRoute);

// App listening on port
app.listen(process.env.PORT || 27017, () =>
	console.log('Backend server listening on designated port ')
);
