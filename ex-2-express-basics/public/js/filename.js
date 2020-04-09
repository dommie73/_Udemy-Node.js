(function() {
	const fileInputElements = document.querySelectorAll(
		'.form-group__input[type="file"]'
	);

	const noFileText = 'No file chosen';

	[...fileInputElements].forEach(fileInputElement => {
		const labelElement = fileInputElement.nextElementSibling;
		const statusText = document.createElement('span');

		statusText.setAttribute('aria-hidden', true);
		statusText.textContent = noFileText;
		labelElement.appendChild(statusText);

		fileInputElement.addEventListener('change', event => {
			const filename = event.target.value.split('\\').pop();

			statusText.textContent = filename || noFileText;
		});
	});
})();
