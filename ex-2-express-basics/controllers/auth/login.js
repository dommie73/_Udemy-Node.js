const { User } = require('../../models');

const login = async (req, res) => {
	req.session.userId = User.defaultId;
	req.session.save(() => {
		res.redirect('/');
	});
};

module.exports = login;
