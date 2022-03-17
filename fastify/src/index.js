const fastify = require('fastify')({
  logger: true,
});

const productsRotes = require('./routes/products.routes');
const swagger = require('./utils/swagger');
require('./utils/mongoose');
fastify.register(require('fastify-swagger'), swagger.options);
// fastify.route({
//   method: 'GET',
//   url: '/',
//   handler: function (req, reply) {
//     reply.send('Hello World!');
//   },
// });

fastify.get('/', async function (req, reply) {
  reply.send({ msg: 'Hello World!' });
});
// Product Routes
productsRotes.forEach((route) => {
  fastify.route(route);
});

// Run the server and listen on port 3000
const start = async () => {
  try {
    await fastify.listen(3000, (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(`server listening on ${address}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
