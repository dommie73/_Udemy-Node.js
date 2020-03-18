const path = require('path');

const sgMail = require('@sendgrid/mail');
const ejs = require('ejs');

const { logError, logSuccess, rootDir } = require('../utils/helpers');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEjs = async (emailData, template, templateData) => {
	const templatePath = path.join(rootDir, 'views', template + '.ejs');
	const msg = {
		...emailData,
		html: await ejs.renderFile(templatePath, templateData)
	};

	try {
		await sgMail.send(msg);
		logSuccess(`[sendgrid] email to ${emailData.to} sent`);
	} catch (error) {
		logError(`[sendgrid] ${error}`);
	}
};

module.exports.send = sendEjs;
