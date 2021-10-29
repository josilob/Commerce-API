const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

// route imports
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');

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
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);

// App listening on port
app.listen(process.env.PORT || 27017, () =>
	console.log('Backend server listening on designated port ')
);
