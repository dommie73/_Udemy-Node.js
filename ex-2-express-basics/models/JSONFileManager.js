const fs = require('fs');
const path = require('path');

class JSONFileManager {
	static _mainDir = path.dirname(process.mainModule.filename);
	static _pathToJson = '';

	static get pathToJson() {
		return path.join(this._mainDir, this._pathToJson);
	}

	static parseJSONData(data) {
		return JSON.parse(data);
	}

	static async readFile() {
		const parsedData = await new Promise((resolve, reject) => {
			return fs.readFile(this.pathToJson, (error, data) => {
				if (error) {
					return reject(error);
				}
				return resolve(this.parseJSONData(data));
			});
		});

		return parsedData;
	}

	static async writeFile(data) {
		return new Promise((resolve, reject) => {
			return fs.writeFile(
				this.pathToJson,
				JSON.stringify(data, null, 2),
				error => {
					if (error) {
						return reject(error);
					}
					return resolve(`Saved to ${this.pathToJson}`);
				}
			);
		});
	}
}

module.exports = JSONFileManager;
