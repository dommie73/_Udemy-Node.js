/* 
  This middleware exposes a function that wraps `req.session.save` method to prevent race condition.
  `saveSessionAndRedirect` method waits for the current session to be saved and only if it succeeds, 
  redirects to the specified path.
*/
const sessionSaver = (req, res, next) => {
	req.saveSessionAndRedirect = path =>
		req.session.save(err => {
			if (err) {
				next(err);
			}
			res.redirect(path);
		});
	next();
};

module.exports = sessionSaver;
