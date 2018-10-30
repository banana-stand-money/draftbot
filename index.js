'use strict';

const Hapi = require('hapi');
const Bot  = require('./bot.js');
const mongoose = require('mongoose');
const { graphqlHapi, graphiqlHapi } = require('graphql-server-hapi'); 
const schema = require('./graphql/schema');

const server = Hapi.server({
    port: 8080,
    host: 'localhost'
});


mongoose.connect('mongodb://localhost:27017/local')
var db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
 console.log( '+++Connected to mongoose')
})


server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Hello, world!';
    }
});

server.route({
	method: 'POST',
	path: '/',
	handler: (request, h) => {
          return Bot.respond(request.payload)
	}
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {

        return `Hello, ${encodeURIComponent(request.params.name)}!`;
    }
});

const init = async () => {

	await server.register({
        	plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/graphql'
			},
			route: {
				cors: true
			}
		}
	});

	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema
			},
			router: {
				cors: true
			}
		}
	});


    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
