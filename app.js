process.env.NODE_ENV !== 'production' ? require('dotenv').config() : void 0;

const express = require('express');
const dbConnection = require('./config/database.js');

const User = require('./models/user');

const app = express();

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
