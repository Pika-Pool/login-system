const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const { validatePassword } = require('../lib/passwordUtils');

const User = require('../models/user');

const customFields = {
	usernameField: 'email',
	passwordField: 'password',
};

passport.use(new LocalStratergy(customFields, verifyUser));

async function verifyUser(username, password, cb) {
	try {
		const user = await User.findOne({ email: username });

		if (!user) {
			cb(null, false, { errorMsg: 'No user with that email' });
		} else if (validatePassword(password, user.salt, user.hash)) {
			cb(null, user);
		} else {
			cb(null, false, { errorMsg: 'Incorrect Password!!' });
		}
	} catch (err) {
		cb(err);
	}
}

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => {
	User.findById(id)
		.then(user => cb(null, user))
		.catch(cb);
});

module.exports = passport;
