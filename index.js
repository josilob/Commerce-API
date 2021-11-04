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

// const whitelist = [
// 	'localhost:27017',
// 	'localhost:3000',
// 	'http://localhost:3000',
// 	'http://localhost:27017',
// 	'https://marketplace-neon.vercel.app/',
// 	'marketplace-neon.vercel.app/'
// ];
// const corsOptions = {
// 	origin: function (origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1) {
// 			callback(null, true);
// 		} else {
// 			callback(new Error('Not allowed by CORS'));
// 		}
// 	},
// 	methods: ['GET', 'POST', 'PUT', 'DELETE']
// };

// app.use(cors({ corsOptions }));
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
