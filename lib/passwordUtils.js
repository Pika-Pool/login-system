const crypto = require('crypto');

function validatePassword(password, salt, hash) {
	const genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');

	return hash === genHash;
}

function genHashedPassword(password) {
	const salt = crypto.randomBytes(32).toString('hex');
	const hash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');

	return { salt, hash };
}

module.exports = { validatePassword, genHashedPassword };
