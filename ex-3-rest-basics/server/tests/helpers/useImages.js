const fs = require('fs').promises;
const path = require('path');

const chai = require('chai');
const chaiFiles = require('chai-files');

const { destination } = require('../../utils/imageUpload');

const getImagePath = file => path.resolve(destination, file);

const getTestFile = async file => ({
	buffer: await fs.readFile(path.resolve('tests', 'helpers', 'files', file)),
	name: file
});

const useImages = function () {
	chai.use(chaiFiles);
	global.dir = chaiFiles.dir(destination);
	global.file = file => chaiFiles.file(getImagePath(file));

	before(function hookTestImages() {
		this.images = {
			getValid: () => getTestFile('valid.jpg'),
			getTooLarge: () => getTestFile('too-large.jpg'),
			getNonImage: () => getTestFile('not-an-image.txt')
		};
	});

	afterEach(async function clearTempDirectory() {
		await fs.rmdir(destination, { recursive: true });
		await fs.mkdir(destination);
	});
};

module.exports = useImages;
