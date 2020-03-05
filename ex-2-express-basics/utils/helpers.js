const chalk = require('chalk');

exports.logError = error => {
	console.log(chalk.red(error));
};

exports.logSuccess = message => {
	console.log(chalk.green(message));
};
