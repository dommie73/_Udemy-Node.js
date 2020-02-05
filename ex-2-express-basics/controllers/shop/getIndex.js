const getIndex = (req, res) => {
	res.render('shop/index', { pageTitle: 'Home' });
};

module.exports = getIndex;
