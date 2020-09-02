import { ErrorRequestHandler } from 'express';

import { NotFoundError, ValidationError } from '@/common/errors';

export const handleError: ErrorRequestHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	if (err instanceof NotFoundError) {
		res.status(404).send({ message: err.message, resource: err.resource });
	} else if (err instanceof ValidationError) {
		res
			.status(422)
			.send({ message: err.message, invalidFields: err.invalidFields });
	} else {
		res.status(500).send({ message: 'Unknown error' });
	}
};
