import { RequestHandler } from 'express';

import { TodosService } from '@/services';

export const createTodo: RequestHandler = (req, res, next) => {
	try {
		const { title } = req.body;
		const todo = TodosService.createTodo(title);

		res.status(201).send({ message: 'Todo created', todo });
	} catch (err) {
		next(err);
	}
};
