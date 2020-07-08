module.exports = function isLoggedIn(req, res, next) {
	if(req && typeof req.isAuthenticated === 'function') {
		res.locals.isLoggedIn = req.isAuthenticated();
	}
	next();
}
