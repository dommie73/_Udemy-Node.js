import { RequestHandler } from 'express';

import { TodosService } from '@/services';

export const getTodos: RequestHandler = (req, res, next) => {
	try {
		const todos = TodosService.getTodos();

		res.status(200).send({ todos });
	} catch (err) {
		next(err);
	}
};
