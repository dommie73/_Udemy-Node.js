const setCorsHeaders = (req, res, next) => {
	res.set({
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers': 'Authorization, Content-Type',
		'Access-Control-Allow-Methods': 'DELETE, GET, HEAD, PATCH, POST, PUT'
	});

	next();
};

module.exports = setCorsHeaders;
