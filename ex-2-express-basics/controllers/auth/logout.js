const logout = (req, res, next) => {
	req.session.destroy(() => {
		/* 
			req.flash() cannot be used here because the session has just been destroyed. 
			A cookie is used instead.
		 */
		res.cookie('loggedOut', true, { httpOnly: true });
		res.redirect('/');
	});
};

module.exports = logout;
