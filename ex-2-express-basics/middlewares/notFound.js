const notFound = (req, res) => {
	res.status(404).render('errors/not-found', { pageTitle: '404' });
};

module.exports = notFound;
