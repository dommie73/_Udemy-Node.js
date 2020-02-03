const path = require('path');

const express = require('express');
const expressHbs = require('express-handlebars');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { currentUrl, notFound, reqLogger } = require('./middlewares');
const hbsHelpers = require('./utils/handlebarsHelpers');
const pages = require('./utils/pages');

const app = express();

app.locals.pages = pages;

app.engine(
	'hbs',
	expressHbs({ defaultLayout: 'default', extname: 'hbs', helpers: hbsHelpers })
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views', 'handlebars'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(currentUrl);
app.use(reqLogger);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

app.listen(3000);
