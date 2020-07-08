process.env.NODE_ENV !== 'production' ? require('dotenv').config() : void 0;

const express = require('express');
const dbConnection = require('./config/database.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));

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

const passport = require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
