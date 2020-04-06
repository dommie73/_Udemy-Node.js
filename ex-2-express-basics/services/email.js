const sgMail = require('@sendgrid/mail');
const ejs = require('ejs');

const { getTemplatePath } = require('../utils/files');
const { logError, logSuccess } = require('../utils/helpers');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEjs = async (emailData, templateName, templateData) => {
	const templatePath = getTemplatePath(templateName);
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
