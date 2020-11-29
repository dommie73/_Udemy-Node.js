import { RequestHandler } from 'express';

import { TodosService } from '@/services';

export const updateTodo: RequestHandler = (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, completed } = req.body;
		const todo = TodosService.updateTodo(id, { title, completed });

		res.status(200).send({ message: 'Todo updated', todo });
	} catch (err) {
		next(err);
	}
};
