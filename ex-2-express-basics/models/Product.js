const products = [];

class Product {
	constructor(name) {
		this.name = name;
	}

	save() {
		products.push(this);
	}

	static fetchAll() {
		return products;
	}
}

products.push(
	new Product('product is null'),
	new Product('undefined product'),
	new Product('product is not defined')
);

module.exports = Product;
