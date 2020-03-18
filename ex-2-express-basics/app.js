const path = require('path');

const express = require('express');
const csrf = require('csurf');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const errorController = require('./controllers/error');
const middlewares = require('./middlewares');
const routes = require('./routes');
const pages = require('./utils/pages');
const { logError, logSuccess } = require('./utils/helpers');
const connectToDb = require('./database');
const email = require('./services/email');

const app = express();

app.locals.pages = pages;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(middlewares.mongoSession);
app.use(csrf());
app.use(middlewares.csrfToken);
app.use(middlewares.user);
app.use(middlewares.isAuthenticated);
app.use(flash());
app.use(middlewares.flashMessages);
app.use(middlewares.currentUrl);
app.use(middlewares.reqLogger);
app.use('/admin', routes.admin);
app.use(routes.shop);
app.use(routes.auth);
app.use(errorController.get404);

connectToDb()
	.then(() => {
		app.listen(process.env.PORT);
		logSuccess(`[app] listening on port ${process.env.PORT}`);
	})
	.then(async () => {
		await email.send(
			{
				to: 'test@example.com',
				from: 'test@example.com',
				subject: 'Sending with Twilio SendGrid is Fun',
				text: 'and easy to do anywhere, even with Node.js'
			},
			'emails/welcome',
			{ test: 'Node.js' }
		);
	})
	.catch(error => logError(`[mongoose] ${error.message}`));
