const { model, Schema, Types } = require('mongoose');
const { compare, hash } = require('bcryptjs');

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
		},
		posts: [
			{
				type: Types.ObjectId,
				ref: 'Post'
			}
		]
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await hash(this.password, 12);
	}
	next();
});

userSchema.set('toJSON', { useProjection: true });

userSchema.method('passwordMatch', async function (password) {
	return await compare(password, this.password);
});

const User = model('User', userSchema);

module.exports = User;
