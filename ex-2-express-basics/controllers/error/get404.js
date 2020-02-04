const get404 = (req, res) => {
	res.status(404).render('not-found', { pageTitle: '404' });
};

module.exports = get404;
