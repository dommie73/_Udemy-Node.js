const getLoginForm = require('./getLoginForm');
const getNewPasswordForm = require('./getNewPasswordForm');
const getPasswordResetForm = require('./getPasswordResetForm');
const getSignupForm = require('./getSignupForm');
const login = require('./login');
const logout = require('./logout');
const sendPasswordResetLink = require('./sendPasswordResetLink');
const signup = require('./signup');
const updatePassword = require('./updatePassword');

module.exports = {
	getLoginForm,
	getNewPasswordForm,
	getPasswordResetForm,
	getSignupForm,
	login,
	logout,
	sendPasswordResetLink,
	signup,
	updatePassword
};
