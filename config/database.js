const mongoose = require('mongoose');

mongoose
	.connect(process.env.DB_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch(err => console.error(`Error connecting to Database : ${err}`));

const db = mongoose.connection;
db.on('error', err => console.error(`Error connecting to Database : ${err}`));
db.once('open', () => console.log('Connected to Database!!'));

module.exports = db;
