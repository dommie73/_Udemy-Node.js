const getLoginForm = require('./getLoginForm');
const getPasswordResetForm = require('./getPasswordResetForm');
const getSignupForm = require('./getSignupForm');
const login = require('./login');
const logout = require('./logout');
const sendPasswordResetLink = require('./sendPasswordResetLink');
const signup = require('./signup');

module.exports = {
	getLoginForm,
	getPasswordResetForm,
	getSignupForm,
	login,
	logout,
	sendPasswordResetLink,
	signup
};
