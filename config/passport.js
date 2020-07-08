const passport = require('passport');
const LocalStratergy = require('passport-local').Strategy;
const { validatePassword } = require('../lib/passwordUtils');

const User = require('../models/user');

const customFields = {
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true,
};

passport.use(new LocalStratergy(customFields, verifyUser));

async function verifyUser(req, username, password, cb) {
	try {
		const user = await User.findOne({ email: username });

		if (!user) {
			req.flash = { msg: 'No user with that email' };
			cb(null, false);
		} else if (validatePassword(password, user.salt, user.hash)) {
			cb(null, user);
		} else {
			req.flash = { msg: 'Incorrect Password!!' };
			cb(null, false);
		}
	} catch (err) {
		cb(err);
	}
}

passport.serializeUser((user, cb) => cb(null, user.id));
passport.deserializeUser((id, cb) => {
	User.findById(id)
		.then(user => cb(user))
		.catch(cb);
});

module.exports = passport;
