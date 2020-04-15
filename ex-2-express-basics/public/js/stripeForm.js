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

	const handlePayment = async (result, form) => {
		if (result.error) {
			return;
		}

		const response = await fetch('/payment', {
			body: JSON.stringify({
				paymentMethodId: result.paymentMethod.id
			}),
			headers: {
				'Content-Type': 'application/json',
				'csrf-token': form.elements._csrf.value
			},
			method: 'POST'
		});
		const paymentResponse = await response.json();

		handleServerResponse(paymentResponse);
	};

	const handleServerResponse = response => {
		console.log(response);
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

	form.addEventListener('submit', async event => {
		event.preventDefault();

		const paymentMethod = await stripe.createPaymentMethod({
			type: 'card',
			card: cardNumber.element
		});

		handlePayment(paymentMethod, form);
	});
})();
