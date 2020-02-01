const path = require('path');

const express = require('express');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { notFound, reqLogger } = require('./middlewares');

const app = express();

app.set('view engine', 'pug');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(reqLogger);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(notFound);

app.listen(3000);
