/* 
Available options: 
	* `requiresAuth` - if true, an item will be displayed only for the authenticated user,
	* `nonAuthOnly` - if true & `requiresAuth` is set to false, an item will be displayed only for the non-authenticated user 
Setting both options to false or leaving them unset will display an item regardless of the user authentication status.
*/

const pages = {
	left: [
		{ title: 'Home', url: '/' },
		{ title: 'Products', url: '/products' },
		{ title: 'Cart', url: '/cart' },
		{ title: 'Orders', url: '/orders' },
		{ title: 'Add Product', url: '/admin/add-product', requiresAuth: true },
		{ title: 'Admin Products', url: '/admin/products', requiresAuth: true }
	],
	right: [{ title: 'Login', url: '/login', nonAuthOnly: true }]
};

module.exports = pages;
