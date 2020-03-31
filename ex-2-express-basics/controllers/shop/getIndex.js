const getIndex = (req, res, next) => {
	try {
		const { loggedOut } = req.cookies;
		const { flashMessages } = res.locals;

		if (loggedOut) {
			/*
				Flash message has to be set this way if the user has just logged out.
				In this case a brand new session is being created.
			*/
			flashMessages.success.push('You have been logged out. Bye!');
		}

		/* 
			Clearing cookie so the message won't appear everywhere after logout.
		*/
		res.clearCookie('loggedOut', { httpOnly: true });
		res.render('shop/index', { pageTitle: 'Home' });
	} catch (err) {
		next(err);
	}
};

module.exports = getIndex;
