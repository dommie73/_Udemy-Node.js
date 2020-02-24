const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');
const { currentUrl, reqLogger } = require('./middlewares');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pages = require('./utils/pages');
const { logError } = require('./utils/helpers');
const sequelize = require('./database');

const app = express();

app.locals.pages = pages;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(currentUrl);
app.use(reqLogger);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

sequelize
	.sync()
	.then(() => app.listen(process.env.PORT))
	.catch(error => logError(error));
