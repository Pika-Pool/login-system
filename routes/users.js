const express = require('express');
const User = require('../models/user');

const router = express.Router();

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.send('is not authenticated');
}

function nocache(req, res, next) {
	res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
	res.header('Expires', '-1');
	res.header('Pragma', 'no-cache');
	next();
}

router.get('/:id', checkAuthenticated, nocache, (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if (!user) return res.redirect('/login');
			res.render('../views/users/index.ejs', { user });
		})
		.catch(err => {
			console.error(err);
			res.redirect('/');
		});
});

router.get('/*', (req, res) => {
	res.redirect('/');
});

module.exports = router;
