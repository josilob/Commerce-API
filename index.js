const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/user');

const app = express();

mongoose
	.connect(`${process.env.DB_URI}`)
	.then(() => console.log('Successful connection'))
	.catch((err) => console.log(err.message));

app.use('/api/user', userRoute);

app.listen(process.env.PORT || 27017, () =>
	console.log('Backend server listening on designated port ')
);
