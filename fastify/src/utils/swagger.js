exports.options = {
  description: 'Get swagger documentation',
  tags: ['api'],
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: {
      title: 'Node.js Fastify MongoDB',
      description: 'Building a blazing API with Node.js, Fastify and MongoDB',
      version: '0.0.1',
    },
  },
  externalDocs: {
    url: 'https://swagger.io',
    description: 'Find more info here',
  },
  host: 'localhost:3000',
  schema: ['http'],
  consume: ['application/json'],
  producers: ['application/json'],
};
