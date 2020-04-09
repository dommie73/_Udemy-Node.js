const PDFDocument = require('pdfkit');

const { getFont } = require('./files');

const generateHeader = (doc, text) => {
	doc.registerFont('light', getFont('Poppins-Light.ttf'));
	doc.registerFont('medium', getFont('Poppins-Medium.ttf'));

	doc
		.font('medium')
		.fontSize(32)
		.text(text)
		.moveDown(0.2)
		.moveTo(doc.x, doc.y)
		.lineTo(doc.page.width - doc.page.margins.right, doc.y)
		.lineWidth(2)
		.stroke()
		.moveDown(0.6);
};

const generateInvoiceData = (doc, order, user) => {
	const currentX = doc.x;
	const currentY = doc.y;
	const customerInfoWidth = 350;

	doc.fontSize(12);

	doc
		.font('medium')
		.text('Bill to', currentX, currentY, {
			continued: true,
			width: customerInfoWidth
		})
		.font('light')
		.text('\n' + user.email);

	doc
		.font('medium')
		.text('Date', currentX + customerInfoWidth, currentY, {
			continued: true,
			width:
				doc.page.width -
				doc.page.margins.right -
				doc.page.margins.left -
				customerInfoWidth
		})
		.font('light')
		.text('\n' + order._id.getTimestamp().toLocaleDateString());

	doc.moveDown(2);
};

const generateProductRow = (doc, name, qty, price, options = {}) => {
	const tableX = doc.page.margins.left;
	const tableY = doc.y;
	const nameColumnWidth = 300;
	const qtyColumnWidth = 80;

	doc.font(options.bold ? 'medium' : 'light');

	if (!options.bold) {
		doc
			.moveTo(tableX, tableY - 7)
			.lineTo(doc.page.width - doc.page.margins.right, tableY - 7)
			.lineWidth(1)
			.strokeColor('#aaaaaa')
			.stroke();
	}

	doc
		.fontSize(14)
		.text(name, tableX, tableY, { width: nameColumnWidth })
		.text(qty, tableX + nameColumnWidth, tableY, { width: qtyColumnWidth })
		.text(price, tableX + nameColumnWidth + qtyColumnWidth, tableY, {
			width:
				doc.page.width -
				doc.page.margins.left -
				nameColumnWidth -
				qtyColumnWidth -
				doc.page.margins.right
		});

	doc.moveDown(options.bold ? 0.9 : 0.6);
};

const generateProductsTable = (doc, order) => {
	generateProductRow(doc, 'Name', 'Qty', 'Unit Price', { bold: true });

	order.products.forEach(({ name, quantity, price }) => {
		generateProductRow(doc, name, quantity, `$ ${price.toFixed(2)}`);
	});

	generateProductRow(doc, '', 'Total:', `$ ${order.totalPrice.toFixed(2)}`, {
		bold: true
	});
};

const generateInvoice = (res, order, user) => {
	const invoice = new PDFDocument();

	res.setHeader('Content-Type', 'application/pdf');
	res.setHeader(
		'Content-Disposition',
		`inline; filename=invoice-${order._id}.pdf`
	);

	invoice.pipe(res);

	generateHeader(invoice, 'Invoice');
	generateInvoiceData(invoice, order, user);
	generateProductsTable(invoice, order);

	return invoice.end();
};

module.exports = generateInvoice;
