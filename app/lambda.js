const awsLambdaFastify = require('aws-lambda-fastify');
const server = require('./server');

const proxy = awsLambdaFastify(entry);

exports.handler = proxy;
