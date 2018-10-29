const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } = graphql;

const DraftType = new GraphQLObjectType({
	name: 'Draft',
	fields: () => ({
		draftId: {type: GraphQLInt },
		tourneyName: {type: GraphQLString },
		completed: {type: GraphQLBoolean },
	})

});

module.exports = DraftType;
