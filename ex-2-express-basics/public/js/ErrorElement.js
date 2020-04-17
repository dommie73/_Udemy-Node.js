class ErrorElement {
	static _container = document.querySelector('.alerts');

	constructor(message) {
		this._node = null;
		this._message = message;
		this._createErrorElement();
	}

	_createErrorElement() {
		this._node = document.createElement('div');
		this._node.setAttribute('role', 'alert');
		this._node.className = 'alert alert--error';
		this._message ? this.show() : this.hide();

		ErrorElement._container.appendChild(this._node);
	}

	hide() {
		this._node.style.display = 'none';
	}

	show(message) {
		this._node.textContent = message || this._message;
		this._node.style.display = 'block';
	}
}
