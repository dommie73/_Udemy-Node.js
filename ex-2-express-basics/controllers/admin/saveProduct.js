const saveProduct = (req, res) => {
	console.log(req.body.name);
	res.redirect('/');
};

module.exports = saveProduct;
