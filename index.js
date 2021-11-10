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

// const headers = (req, res, next) => {
// 	const origin = req.headers.origin;
// 	if (
// 		origin == 'http://localhost:3000/' ||
// 		origin == 'https://marketplace-josilob.vercel.app/'
// 	)
// 		res.setHeader('Access-Control-Allow-Origin', origin);
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// 	res.setHeader('Access-Control-Allow-Credentials', true);
// 	next();
// };

// use parser for requests
app.use(express.json()); // parse json bodies

// app.use(cors());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type,  Accept, Authorization'
	);
	res.header(
		'Access-Control-Allow-Methods',
		'GET,POST,fetch, PATCH,OPTIONS,DELETE'
	);
	res.header('Access-Control-Allow-Credentials', true);

	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH,FETCH, DELETE, GET'
		);
		return res.json({});
	} else {
		next();
	}
});

// Server routes
app.get('/', (req, res) => {
	res.json({ message: 'Marketplace backend home' });
});
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
