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

// CORS ALLOWED DOMAIN
const corsOptions = {
	origin: 'https://marketplace-neon.vercel.app',
	optionsSuccessStatus: 200
};
// app.use(function (req, res, next) {
// 	res.header(
// 		'Access-Control-Allow-Origin',
// 		'https://marketplace-josilob.vercel.app'
// 	);
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept'
// 	);
// 	next();
// });

// Server routes
app.get('/', (req, res) => {
	res.json({ message: 'Marketplace backend home' });
});
app.use('/users', cors(corsOptions), userRoute);
app.use('/auth', cors(corsOptions), authRoute);
app.use('/products', cors(corsOptions), productRoute);
app.use('/cart', cors(corsOptions), cartRoute);
app.use('/orders', cors(corsOptions), orderRoute);
app.use('/checkout', cors(corsOptions), stripeRoute);

// App listening on port
app.listen(process.env.PORT || 27017, () =>
	console.log('Backend server listening on designated port ')
);
