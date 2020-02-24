const path = require('path');

const express = require('express');

const errorController = require('./controllers/error');
const { currentUrl, reqLogger, user } = require('./middlewares');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const pages = require('./utils/pages');
const { logError } = require('./utils/helpers');
const sequelize = require('./database');
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

sequelize
	.sync()
	.then(() => User.findByPk(1))
	.then(user => user || User.create({ name: 'Dummy', email: 'dummy@us.er' }))
	.then(() => app.listen(process.env.PORT))
	.catch(error => logError(error));
