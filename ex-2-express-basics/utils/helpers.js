const chalk = require('chalk');

exports.logError = error => {
	console.log(chalk.red(error));
};
