const chalk = require('chalk');

const reqLogger = (req, res, next) => {
	console.log(chalk.blue(`requested: ${chalk.bold(req.path)}`));
	next();
};

module.exports = reqLogger;
