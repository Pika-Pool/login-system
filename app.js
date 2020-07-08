process.env.NODE_ENV !== 'production' ? require('dotenv').config() : void 0;

const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.get('/', (req, res) => {
	res.send('This is the index page');
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
