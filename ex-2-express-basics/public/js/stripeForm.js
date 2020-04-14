(function() {
	const stripe = Stripe(publishableKey);
	const elements = stripe.elements({
		fonts: [
			{
				cssSrc: 'https://fonts.googleapis.com/css?family=Poppins&display=swap'
			}
		]
	});

	const computedLabelStyle = window.getComputedStyle(
		document.querySelector('.form-group__label')
	);

	const style = {
		base: {
			fontFamily: computedLabelStyle.getPropertyValue('font-family'),
			fontSize: computedLabelStyle.getPropertyValue('font-size')
		}
	};

	const cardNumber = elements
		.create('cardNumber', { style })
		.mount('#card-number');
	const cardExpiry = elements
		.create('cardExpiry', { style })
		.mount('#card-expiry');
	const cardCvc = elements.create('cardCvc', { style }).mount('#card-cvc');
})();
