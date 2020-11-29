import { Router } from 'express';

import * as todosControllers from '@/controllers/todos';

const router = Router();

router.get('/', todosControllers.getTodos);
router.post('/', todosControllers.createTodo);
router.put('/:id', todosControllers.updateTodo);
router.delete('/:id', todosControllers.removeTodo);

export { router };
