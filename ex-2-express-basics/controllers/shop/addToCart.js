const addToCart = (req, res) => {
	const { productId } = req.body;
	console.log(productId);
	res.redirect('/cart');
};

module.exports = addToCart;
