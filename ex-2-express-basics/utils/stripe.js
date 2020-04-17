const intentStatuses = {
	action: 'requires_action',
	success: 'succeeded'
};

const generatePaymentResponse = (res, intent) => {
	if (intent && intent.status) {
		if (
			intent.status === intentStatuses.action &&
			intent.next_action.type === 'use_stripe_sdk'
		) {
			return res.status(200).send({
				requiresAction: true,
				paymentIntentClientSecret: intent.client_secret
			});
		}

		if (intent.status === intentStatuses.success) {
			return res.status(200).send({ success: true });
		}
	}

	return res.status(400).send({ error: 'Invalid PaymentIntent status.' });
};

module.exports = {
	generatePaymentResponse,
	intentStatuses
};
