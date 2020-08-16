const {
	GraphQLNonNull: NonNull,
	GraphQLObjectType,
	GraphQLString
} = require('graphql');

const DateTime = require('./DateTime');
const MongoDBObjectId = require('./MongoDBObjectId');

const Post = new GraphQLObjectType({
	name: 'Post',
	fields: () => {
		const User = require('./User');

		return {
			_id: { type: new NonNull(MongoDBObjectId) },
			title: { type: new NonNull(GraphQLString) },
			image: { type: new NonNull(GraphQLString) },
			content: { type: new NonNull(GraphQLString) },
			creator: { type: new NonNull(User) },
			createdAt: { type: new NonNull(DateTime) },
			updatedAt: { type: new NonNull(DateTime) }
		};
	}
});

module.exports = Post;
