const graphql = require('graphql');
const DraftType = require('./DraftType');
const Draft = require('./../models/draft');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
	GraphQLBoolean
} = graphql;

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		draft: {
			type: DraftType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args){
				return Draft.findById(args.id)
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
