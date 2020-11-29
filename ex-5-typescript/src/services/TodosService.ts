import { NotFoundError, ValidationError } from '@/common/errors';
import { todos } from '@/data';
import { Todo } from '@/models';

interface TodoInput {
	title: unknown;
	completed: unknown;
}

export const TodosService = {
	createTodo(title: unknown) {
		if (typeof title !== 'string' || title.length === 0) {
			throw new ValidationError({ title: 'title must be a non-empty string' });
		}

		const now = new Date();
		const todo: Todo = {
			id: (now.valueOf() * Math.floor(Math.random() * 1000)).toString(),
			title,
			completed: false,
			createdAt: now,
			updatedAt: now
		};

		todos.push(todo);

		return todo;
	},

	getTodos() {
		return todos;
	},

	removeTodo(id: unknown) {
		const todoIndex = todos.findIndex(todo => todo.id === id);

		if (todoIndex === -1) {
			throw new NotFoundError('todo');
		}

		todos.splice(todoIndex, 1);
	},

	updateTodo(id: unknown, { title, completed }: TodoInput) {
		const errors: Partial<Record<keyof TodoInput, string>> = {};

		if (title != null) {
			if (typeof title !== 'string' || title.length === 0) {
				errors.title = 'title must be a non-empty string';
			}
		}

		if (completed != null) {
			if (typeof completed !== 'boolean') {
				errors.completed = 'completion flag must be a boolean';
			}
		}

		if (Object.keys(errors).length > 0) {
			throw new ValidationError(errors as Record<string, string>);
		}

		const todoIndex = todos.findIndex(todo => todo.id === id);

		if (todoIndex === -1) {
			throw new NotFoundError('todo');
		}

		todos[todoIndex] = {
			...todos[todoIndex],
			...((title && { title }) as {}),
			...((completed && { completed }) as {}),
			updatedAt: new Date()
		};

		return todos[todoIndex];
	}
};
