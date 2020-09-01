import { Todo } from '@/models';

export const todos: Todo[] = [
	{
		id: '1',
		title: 'Use TypeScript in Node.js project',
		completed: true,
		createdAt: new Date('2020-09-01 18:23:12'),
		updatedAt: new Date('2020-09-01 22:01:42')
	},
	{
		id: '2',
		title: 'Finish this course already',
		completed: false,
		createdAt: new Date('2020-09-01 21:33:34'),
		updatedAt: new Date('2020-09-01 21:33:34')
	}
];
