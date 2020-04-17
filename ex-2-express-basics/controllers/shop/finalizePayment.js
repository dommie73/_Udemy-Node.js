const stripe = require('../../services/stripe');
const { roundPrice } = require('../../utils/helpers');
const {
	generatePaymentResponse,
	intentStatuses
} = require('../../utils/stripe');

const finalizePayment = async (req, res, next) => {
	try {
		const { user } = req;
		const cart = await user.getCart();
		const { paymentIntentId, paymentMethodId } = req.body;
		let intent;

		if (paymentIntentId) {
			intent = await stripe.paymentIntents.confirm(paymentIntentId);
		} else if (paymentMethodId) {
			intent = await stripe.paymentIntents.create({
				amount: roundPrice(cart.totalPrice) * 100,
				confirm: true,
				confirmation_method: 'manual',
				currency: 'usd',
				payment_method: paymentMethodId
			});
		}

		if (intent && intent.status === intentStatuses.success) {
			req.flash('success', 'Thank you for placing the order!');
			await user.createOrder();
		}

		return generatePaymentResponse(res, intent);
	} catch (err) {
		if (err.type === 'StripeCardError') {
			return res.status(200).send({ error: err.raw });
		}
		res.status(500).send({ error: { message: 'Internal server error.' } });
	}
};

module.exports = finalizePayment;
