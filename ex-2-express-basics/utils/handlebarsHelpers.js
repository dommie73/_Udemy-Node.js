const helpers = {
	activeClass: function activeClass(url, currentUrl) {
		return url === currentUrl ? 'active' : '';
	}
};

module.exports = helpers;
