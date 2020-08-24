const { model, Schema } = require('mongoose');
const { compare, hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { normalizeEmail } = require('validator');

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true,
			select: false
		},
		name: {
			type: String,
			required: true
		},
		status: {
			type: String,
			default: 'I am new!'
		}
	},
	{ timestamps: true }
);

userSchema.virtual('posts', {
	ref: 'Post',
	localField: '_id',
	foreignField: 'creator'
});

userSchema.pre('save', async function (next) {
	if (this.isModified('email')) {
		this.email = normalizeEmail(this.email);
	}
	if (this.isModified('password')) {
		this.password = await hash(this.password, 12);
	}
	if (this.isModified('status')) {
		this.status = this.status.trim();
	}
	next();
});

userSchema.set('toJSON', { useProjection: true });

userSchema.method('passwordMatch', async function (password) {
	return await compare(password, this.password);
});

userSchema.method('generateToken', function () {
	const { _id, email } = this;
	const payload = { userId: _id.toString(), email };

	return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
});

const User = model('User', userSchema);

module.exports = User;
