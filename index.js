'use strict';

const Hapi = require('hapi');
const Bot  = require('./bot.js');

const server = Hapi.server({
    port: 8080,
    host: 'localhost'
});

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

        request.logger.info('In handler %s', request.path);

        return `Hello, ${encodeURIComponent(request.params.name)}!`;
    }
});

const init = async () => {

    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: false,
            logEvents: ['response', 'onPostStart']
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
