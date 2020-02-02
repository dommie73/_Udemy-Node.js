const path = require('path');

const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { currentUrl, notFound, reqLogger } = require('./middlewares');
const pages = require('./utils/pages');

const app = express();

app.locals.pages = pages;

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(currentUrl);
app.use(reqLogger);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

app.listen(3000);
