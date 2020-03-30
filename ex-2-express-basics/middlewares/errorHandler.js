const chalk = require('chalk');

const errorHandler = (err, req, res, next) => {
	console.log(chalk.red(err.toString()));
	res.status(500).render('errors/server-error', { pageTitle: '500' });
};

module.exports = errorHandler;
