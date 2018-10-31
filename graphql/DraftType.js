const graphql = require('graphql');
const GolferType = require('./GolferType');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean, GraphQLList } = graphql;

const DraftType = new GraphQLObjectType({
	name: 'Draft',
	fields: () => ({
		id: { type: GraphQLString },
		draftId: {type: GraphQLInt },
		tourneyName: {type: GraphQLString },
		completed: {type: GraphQLBoolean },
		golfers: {type: new GraphQLList(GolferType)},
		rosterSize: {type: GraphQLInt }
	})

});

module.exports = DraftType;
