(function() {
	const stripe = Stripe(publishableKey);
	const elements = stripe.elements({
		fonts: [
			{ cssSrc: 'https://fonts.googleapis.com/css?family=Poppins&display=swap' }
		]
	});

	const elementClasses = {
		complete: 'valid',
		focus: 'focused',
		invalid: 'invalid'
	};
	const computedLabelStyle = window.getComputedStyle(
		document.querySelector('.form-group__label')
	);
	const elementStyles = {
		base: {
			fontFamily: computedLabelStyle.getPropertyValue('font-family'),
			fontSize: computedLabelStyle.getPropertyValue('font-size')
		},
		invalid: {
			color: computedLabelStyle.getPropertyValue('color')
		}
	};

	const finalizePayment = async body => {
		const response = await fetch('/payment', {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json',
				'csrf-token': form.elements._csrf.value
			},
			method: 'POST'
		});

		return response.json();
	};

	const handlePayment = async (result, form) => {
		if (result.error) {
			stripeClientError.show(result.error.message);
			return;
		}

		const paymentResponse = await finalizePayment({
			paymentMethodId: result.paymentMethod.id,
			form
		});

		handleServerResponse(paymentResponse);
	};

	const handleServerResponse = async response => {
		if (response.error) {
			stripeClientError.show(response.error.message);
			return;
		}

		if (response.requiresAction) {
			const result = await stripe.handleCardAction(
				response.paymentIntentClientSecret
			);

			if (result.error) {
				stripeClientError.show(result.error.message);
				return;
			}

			const paymentResponse = await finalizePayment({
				paymentIntentId: result.paymentIntent.id,
				form
			});

			handleServerResponse(paymentResponse);
		} else {
			location.replace('/orders');
		}
	};

	class StripeElement {
		constructor(elementType, elementSelector) {
			this.error = new ErrorElement();
			this.element = elements.create(elementType, {
				classes: elementClasses,
				style: elementStyles
			});

			this.element.mount(elementSelector);
			this._listenForErrors();
		}

		_listenForErrors() {
			this.element.on('change', event => {
				event.error ? this.error.show(event.error.message) : this.error.hide();
			});
		}
	}

	const cardNumber = new StripeElement('cardNumber', '#card-number');
	const cardExpiry = new StripeElement('cardExpiry', '#card-expiry');
	const cardCvc = new StripeElement('cardCvc', '#card-cvc');

	const form = document.querySelector('#payment');
	const stripeClientError = new ErrorElement();

	form.addEventListener('submit', async event => {
		event.preventDefault();
		stripeClientError.hide();

		const paymentMethod = await stripe.createPaymentMethod({
			type: 'card',
			card: cardNumber.element
		});

		handlePayment(paymentMethod, form);
	});
})();
