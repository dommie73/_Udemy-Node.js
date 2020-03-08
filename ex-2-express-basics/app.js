const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');
const { currentUrl, reqLogger, user } = require('./middlewares');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pages = require('./utils/pages');
const { logError, logSuccess } = require('./utils/helpers');
const connectToDb = require('./database');
const { User } = require('./models');

const app = express();

app.locals.pages = pages;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(currentUrl);
app.use(reqLogger);
app.use(user);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
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
