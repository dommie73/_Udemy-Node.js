const { model, Schema, Types } = require('mongoose');

const _defaultId = '5e5edf4325e1d120d896d4c8';

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	cart: {
		products: [
			{
				id: {
					type: Types.ObjectId,
					ref: 'Product',
					required: true
				},
				quantity: {
					type: Number,
					required: true
				}
			}
		]
	}
});

userSchema.static('createDefault', function() {
	return this.create({
		_id: _defaultId,
		name: 'Dummy',
		email: 'dummy@us.er'
	});
});

userSchema.static('findDefault', function() {
	return this.findById(_defaultId);
});

const User = model('User', userSchema);

module.exports = User;
