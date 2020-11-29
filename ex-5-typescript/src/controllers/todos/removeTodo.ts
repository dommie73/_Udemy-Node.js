import { RequestHandler } from 'express';

import { TodosService } from '@/services';

export const removeTodo: RequestHandler = (req, res, next) => {
	try {
		const { id } = req.params;

		TodosService.removeTodo(id);

		res.status(200).send({ message: 'Todo removed' });
	} catch (err) {
		next(err);
	}
};
