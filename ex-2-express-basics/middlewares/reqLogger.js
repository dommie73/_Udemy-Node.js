const chalk = require('chalk');

const reqLogger = (req, res, next) => {
	console.log(
		chalk.blue(
			`requested: ${chalk.bold(req.path)}\n` +
				`  - method: ${chalk.bold(req.method)},\n` +
				`  - user: ${chalk.bold(req.user && req.user.email)}`
		)
	);
	next();
};

module.exports = reqLogger;
