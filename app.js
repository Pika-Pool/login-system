process.env.NODE_ENV !== 'production' ? require('dotenv').config() : void 0;

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const dbConnection = require('./config/database.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// sessions and authentication
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: dbConnection }),
		cookie: {
			maxAge: 1000 * 30,
		},
	})
);

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// store isLoggedIn boolean variable in res.local
app.use(require('./lib/isLoggedIn'));

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
