const express = require('express');
const csrf = require('csurf');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');

const middlewares = require('./middlewares');
const routes = require('./routes');
const pages = require('./utils/pages');
const { dest } = require('./utils/files');
const { logError, logSuccess } = require('./utils/helpers');
const connectToDb = require('./database');

const app = express();

app.locals.pages = pages;

app.set('view engine', 'ejs');
app.set('views', dest.views);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(dest.public));
app.use(cookieParser());
app.use(middlewares.mongoSession);
app.use(middlewares.sessionSaver);
app.use(csrf());
app.use(middlewares.csrfToken);
app.use(middlewares.user);
app.use(middlewares.isAuthenticated);
app.use(flash());
app.use(middlewares.flashMessages);
app.use(middlewares.inputSaver);
app.use(middlewares.currentUrl);
app.use(middlewares.reqLogger);
app.use('/admin', routes.admin);
app.use(routes.shop);
app.use(routes.auth);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

connectToDb()
	.then(() => {
		app.listen(process.env.PORT);
		logSuccess(`[app] listening on port ${process.env.PORT}`);
	})
	.catch(error => logError(`[mongoose] ${error.message}`));
