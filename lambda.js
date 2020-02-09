const awsLambdaFastify = require('aws-lambda-fastify');
const server = require('./server');

const proxy = awsLambdaFastify(server);

exports.handler = proxy;
