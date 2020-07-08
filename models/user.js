const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	salt: String,
	hash: String,
});

module.exports = mongoose.model('users', UserSchema);
