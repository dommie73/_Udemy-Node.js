(function() {
	document.addEventListener('click', deleteAsync);

	async function deleteAsync(event) {
		const formElement = event.target.form;

		if (!formElement) {
			return;
		}

		if (formElement.classList.contains('delete')) {
			event.preventDefault();

			try {
				const hiddenInputs = getHiddenValues(formElement);
				const response = await fetch(
					`${formElement.action}/${hiddenInputs.id}`,
					{
						headers: {
							'csrf-token': hiddenInputs._csrf
						},
						method: 'DELETE'
					}
				);
				const { message } = await response.json();

				displayStatusMessage(response.status, message);
			} catch (err) {
				console.error(err);
			}
		}
	}

	function getHiddenValues(form) {
		return Object.fromEntries(
			[...form.elements]
				.filter(
					element => element.nodeName === 'INPUT' && element.type === 'hidden'
				)
				.map(input => [input.name, input.value])
		);
	}

	function displayStatusMessage(status, message) {
		const alertsContainer = document.querySelector('.alerts');
		const alertElement = document.createElement('div');

		alertElement.setAttribute('role', 'alert');
		alertElement.textContent = message;
		alertElement.classList.add(
			'alert',
			`alert--${status === 200 ? 'success' : 'error'}`
		);

		alertsContainer.appendChild(alertElement);
	}
})();
