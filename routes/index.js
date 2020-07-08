const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const { genHashedPassword } = require('../lib/passwordUtils');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('This is the index page');
});

router.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('../views/login.ejs');
});

router.post('/login', checkNotAuthenticated, (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);

		if (info && info.errorMsg) {
			return res.render('../views/login.ejs', {
				errorMessage: info.errorMsg,
			});
		}

		req.logIn(user, err => {
			if (err) {
				return next(err);
			}
			console.log(`Inside login POST - login successful - ${user}`);
			return res.redirect(`/users/${user.id}`);
		});
	})(req, res, next);
});

router.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('../views/register.ejs');
});

router.post('/register', checkNotAuthenticated, (req, res) => {
	const { salt, hash } = genHashedPassword(req.body.password);

	const newUser = new User({
		name: req.body.name,
		email: req.body.email,
		salt,
		hash,
	});

	newUser
		.save()
		.then(user => console.log(`Inside register POST - ${user}`))
		.catch(err => console.error(`Inside register POST - ${err}`));

	return res.redirect('/login');
});

function checkNotAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return res.redirect(`/users/${req.user.id}`);
	}

	next();
}

module.exports = router;
