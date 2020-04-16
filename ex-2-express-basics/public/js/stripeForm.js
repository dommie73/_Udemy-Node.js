(function() {
	/* Stripe initialization */
	const stripe = Stripe(publishableKey);

	/* Stripe `Elements` instance */
	const elements = stripe.elements({
		fonts: [
			{ cssSrc: 'https://fonts.googleapis.com/css?family=Poppins&display=swap' }
		]
	});

	/* Styles for the Stripe elements */
	const computedLabelStyle = window.getComputedStyle(
		document.querySelector('.form-group__label')
	);
	const elementClasses = {
		complete: 'valid',
		focus: 'focused',
		invalid: 'invalid'
	};
	const elementStyles = {
		base: {
			fontFamily: computedLabelStyle.getPropertyValue('font-family'),
			fontSize: computedLabelStyle.getPropertyValue('font-size')
		},
		invalid: {
			color: computedLabelStyle.getPropertyValue('color')
		}
	};

	/* Stripe `Element` instances */
	const cardNumber = createStripeElement('cardNumber', '#card-number');
	const cardExpiry = createStripeElement('cardExpiry', '#card-expiry');
	const cardCvc = createStripeElement('cardCvc', '#card-cvc');

	/* Form containing the Stripe elements & CSRF token */
	const form = document.querySelector('#payment');
	const stripeClientError = new ErrorElement();

	form.addEventListener('submit', handlePayment);

	/* Helper functions */
	function createStripeElement(type, selector) {
		const error = new ErrorElement();
		const element = elements.create(type, {
			classes: elementClasses,
			style: elementStyles
		});

		element.mount(selector);
		element.on('change', event =>
			event.error ? error.show(event.error.message) : error.hide()
		);

		return element;
	}

	async function handlePayment(event) {
		event.preventDefault();
		stripeClientError.hide();

		const payment = await stripe.createPaymentMethod({
			type: 'card',
			card: cardNumber
		});

		if (payment.error) {
			stripeClientError.show(payment.error.message);
		} else {
			const paymentResponse = await finalizePayment({
				paymentMethodId: payment.paymentMethod.id
			});

			handleServerResponse(paymentResponse);
		}
	}

	async function finalizePayment(body) {
		const response = await fetch('/payment', {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'csrf-token': form.elements._csrf.value
			},
			method: 'POST'
		});

		return response.json();
	}

	async function handleServerResponse(response) {
		if (response.error) {
			stripeClientError.show(response.error.message);
		} else if (response.requiresAction) {
			const cardAction = await stripe.handleCardAction(
				response.paymentIntentClientSecret
			);

			if (cardAction.error) {
				stripeClientError.show(cardAction.error.message);
			} else {
				const paymentResponse = await finalizePayment({
					paymentIntentId: cardAction.paymentIntent.id
				});

				handleServerResponse(paymentResponse);
			}
		} else {
			location.replace('/orders');
		}
	}
})();
