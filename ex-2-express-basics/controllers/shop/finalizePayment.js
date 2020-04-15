const finalizePayment = async (req, res, next) => {
	const { paymentMethodId } = req.body;

	return res.status(200).send({ paymentMethodId });
};

module.exports = finalizePayment;
