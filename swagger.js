const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Handong ClubHub API',
    description: 'API documentation for Handong ClubHub Backend',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./src/server.ts']; // You can point to server.ts or index.ts

swaggerAutogen(outputFile, endpointsFiles, doc);
