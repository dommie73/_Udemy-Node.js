const {
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull: NonNull,
	GraphQLObjectType
} = require('graphql');

const Post = require('./Post');

const PostList = new GraphQLObjectType({
	name: 'PostList',
	fields: {
		posts: { type: new NonNull(new GraphQLList(new NonNull(Post))) },
		totalItems: { type: new NonNull(GraphQLInt) },
		totalPages: { type: new NonNull(GraphQLInt) }
	}
});

module.exports = PostList;
