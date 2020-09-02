export class ValidationError extends Error {
	constructor(public invalidFields: Record<string, string>) {
		super('Validation failed');
	}
}

export class NotFoundError extends Error {
	constructor(public resource: string) {
		super('Resource not found');
	}
}
