const db = require('../database');
const { logError } = require('../utils/helpers');

class Product {
	constructor(name, imageUrl, price, description) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.price = price;
		this.description = description;
	}

	static _mapDataFromDB(data) {
		return data.map(({ id, name, description, price, image_url }) => {
			const mappedObject = {
				id,
				name,
				description,
				price: +price,
				imageUrl: image_url
			};
			Object.setPrototypeOf(mappedObject, Product.prototype);
			return mappedObject;
		});
	}

	static async deleteById(id) {
		try {
			await db.execute('DELETE FROM `products` WHERE `id` = ?', [id]);
		} catch (error) {
			logError(error);
		}
	}

	static async fetchAll() {
		try {
			const [rows] = await db.execute('SELECT * from `products`');
			return this._mapDataFromDB(rows);
		} catch (error) {
			logError(error);
			return null;
		}
	}

	static async fetchById(id) {
		try {
			const [
				rows
			] = await db.execute('SELECT * from `products` WHERE `id` = ? LIMIT 1', [
				id
			]);
			const [row] = this._mapDataFromDB(rows);
			return row;
		} catch (error) {
			logError(error);
			return null;
		}
	}

	async save(data = {}) {
		const hasId = this.hasOwnProperty('id');
		const { name, price, description, imageUrl } = hasId ? data : this;

		try {
			if (hasId) {
				return await db.execute(
					'UPDATE `products` SET `name` = ?, `price` = ?, `description` = ?, `image_url` = ? WHERE `id` = ?',
					[name, price, description, imageUrl, this.id]
				);
			}

			await db.execute(
				'INSERT INTO `products` (`name`,  `price`, `description`, `image_url`) VALUES (?, ?, ?, ?)',
				[name, price, description, imageUrl]
			);
		} catch (error) {
			logError(error);
		}
	}
}

module.exports = Product;
