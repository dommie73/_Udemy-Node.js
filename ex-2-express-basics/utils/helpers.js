const crypto = require('crypto');
const path = require('path');

const chalk = require('chalk');

exports.addHoursToNow = hours => new Date(Date.now() + hours * 60 * 60 * 1000);

exports.generateToken = size =>
	new Promise((resolve, reject) => {
		crypto.randomBytes(size, (error, buffer) => {
			if (error) {
				reject(error);
			}
			resolve(buffer.toString('hex'));
		});
	});

exports.logError = error => {
	console.log(chalk.red(error));
};

exports.logSuccess = message => {
	console.log(chalk.green(message));
};

exports.rootDir = path.dirname(process.mainModule.filename);

exports.truncateEmail = email => email.substring(0, email.lastIndexOf('@'));
