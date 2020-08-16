class ErrorHandler extends Error {
	constructor(statusCode = 500, message, data) {
		super(message);
		this.statusCode = statusCode;
		this.data = data;
	}
}

module.exports = ErrorHandler;
