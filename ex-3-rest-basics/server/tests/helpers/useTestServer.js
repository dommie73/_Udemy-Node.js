const chai = require('chai');
const chaiHttp = require('chai-http');

const { runApp } = require('../../app');
const { closeAsync } = require('../../utils/promisifyApp');

const useTestServer = function () {
	chai.use(chaiHttp);
	chai.should();
	global.chai = chai;

	before(async function runTestServer() {
		const { mongoose, server } = await runApp();

		Object.assign(this, { mongoose, server });
	});

	beforeEach(async function removeCollections() {
		const collections = await this.mongoose.connection.db.collections();

		for (const collection of collections) {
			await collection.drop();
		}
	});

	after(async function stopTestServer() {
		await this.mongoose.disconnect();
		await closeAsync(this.server);
	});
};

module.exports = useTestServer;
