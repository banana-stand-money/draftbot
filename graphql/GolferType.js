const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } = graphql;

const GolferType = new GraphQLObjectType({
	name: 'Golfer',
	fields: () => ({
		name: { type: GraphQLString },
		odds: {type: GraphQLInt },
		team: {type: GraphQLString },
	})

});

module.exports = GolferType;
