const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('This is the index page');
});

router.get('/login', (req, res) => {
	res.render('../views/login.ejs');
});

router.get('/register', (req, res) => {
	res.render('../views/register.ejs')
});

module.exports = router;
