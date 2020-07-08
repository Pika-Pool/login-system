const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	salt: String,
	hash: String,
});

module.exports = mongoose.model('users', UserSchema);
