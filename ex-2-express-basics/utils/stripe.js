exports.generatePaymentResponse = (res, intent) => {
	if (
		intent.status === 'requires_action' &&
		intent.next_action.type === 'use_stripe_sdk'
	) {
		return res.status(200).send({
			requiresAction: true,
			paymentIntentClientSecret: intent.client_secret
		});
	}

	if (intent.status === 'succeeded') {
		return res.status(200).send({ success: true });
	}

	return res.status(400).send({ error: 'Invalid PaymentIntent status.' });
};
