const path = require('path');

const { move, remove } = require('fs-extra');

/*** Destinations ***/
const root = path.dirname(process.mainModule.filename);
const public = path.join(root, 'public');
const tmp = path.join(root, 'tmp');
const uploads = {
	static: path.join(public, 'uploads'),
	tmp: path.join(tmp, 'uploads')
};
const views = path.join(root, 'views');

exports.dest = {
	root,
	public,
	tmp,
	uploads,
	views
};

exports.getTemplatePath = templateName =>
	path.join(views, templateName + '.ejs');

exports.moveUploadFromTmpToStatic = async file =>
	await move(path.join(uploads.tmp, file), path.join(uploads.static, file));

exports.removeUploadFromTmp = async file =>
	await remove(path.join(uploads.tmp, file));

exports.removeUploadFromStatic = async file =>
	await remove(path.join(uploads.static, file));
