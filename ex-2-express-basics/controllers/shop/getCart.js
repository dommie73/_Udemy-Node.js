const getCart = (req, res) => {
	res.render('shop/cart', { pageTitle: 'Cart' });
};

module.exports = getCart;
