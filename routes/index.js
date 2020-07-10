const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const { genHashedPassword } = require('../lib/passwordUtils');

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index.ejs');
});

router.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs');
});

router.post('/login', checkNotAuthenticated, (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);

		if (info && info.errorMsg) {
			return res.render('login.ejs', {
				errorMessage: info.errorMsg,
			});
		}

		req.logIn(user, err => {
			if (err) {
				return next(err);
			}
			return res.redirect(`/users/${user.id}`);
		});
	})(req, res, next);
});

router.get('/register', checkNotAuthenticated, (req, res) => {
	res.render('register.ejs');
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
		.then(() => res.redirect('/login'))
		.catch(err => {
			console.error(`Inside register POST - ${err}`);
			res.redirect('/register');
		});
});

router.post('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return res.redirect(`/users/${req.user.id}`);
	}

	next();
}

module.exports = router;
