const { Product } = require('../../models');

const deleteProductAsync = async (req, res) => {
	try {
		const { user } = req;
		const { id } = req.params;
		const deletedProduct = await Product.findOneAndRemove({
			_id: id,
			userId: user
		});

		if (!deletedProduct) {
			res.status(403).json({
				message: 'You are not authorized to perform this action.'
			});
		} else {
			res.status(200).json({
				message: `Product ${deletedProduct.name} has been removed.`
			});
		}
	} catch (err) {
		res.status(500).json({
			message:
				'An error occurred while removing the product. Please try again later.'
		});
	}
};

module.exports = deleteProductAsync;
