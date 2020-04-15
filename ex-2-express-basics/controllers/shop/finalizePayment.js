const stripe = require('../../services/stripe');
const { roundPrice } = require('../../utils/helpers');
const { generatePaymentResponse } = require('../../utils/stripe');

const finalizePayment = async (req, res, next) => {
	try {
		const { user } = req;
		const cart = await user.getCart();
		const { paymentMethodId } = req.body;
		let intent;

		if (paymentMethodId) {
			intent = await stripe.paymentIntents.create({
				amount: roundPrice(cart.totalPrice) * 100,
				confirm: true,
				confirmation_method: 'manual',
				currency: 'usd',
				payment_method: paymentMethodId
			});
		}

		return generatePaymentResponse(res, intent);
	} catch (err) {
		if (err.type === 'StripeCardError') {
			return res.status(200).send({ error: err.message });
		}

		res.status(500).send({ error: 'Internal server error.' });
	}
};

module.exports = finalizePayment;
