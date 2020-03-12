const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');
const middlewares = require('./middlewares');
const routes = require('./routes');
const pages = require('./utils/pages');
const { logError, logSuccess } = require('./utils/helpers');
const connectToDb = require('./database');
const { User } = require('./models');

const app = express();

app.locals.pages = pages;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(middlewares.mongoSession);
app.use(middlewares.isAuthenticated);
app.use(middlewares.currentUrl);
app.use(middlewares.reqLogger);
app.use(middlewares.user);
app.use('/admin', routes.admin);
app.use(routes.shop);
app.use(routes.auth);
app.use(errorController.get404);

connectToDb()
	.then(async () => {
		const user = await User.findDefault();
		if (!user) {
			await User.createDefault();
		}
		app.listen(process.env.PORT);
		logSuccess(`[app] listening on port ${process.env.PORT}`);
	})
	.catch(error => logError(`[mongoose] ${error.message}`));
