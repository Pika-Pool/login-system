const crypto = require('crypto');

function validatePassword(password, salt, hash) {
	const genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');

	return hash === genHash;
}

module.exports = {
	validatePassword,
};
