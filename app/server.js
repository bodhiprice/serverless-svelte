'use strict';
const log = require('lambda-log');
const path = require('path');
require('make-promises-safe');

const App = require('./public/App.js');

log.options.debug = process.env.DEBUG;

log.debug('REGION', process.env.REGION);

const fastify = require('fastify');

const server = fastify({
  ignoreTrailingSlash: true
});

const publicPath = path.resolve(__dirname, 'public');

server.register(require('fastify-static'), {
  root: publicPath,
  prefix: '/assets/',
  setHeaders: function(res) {
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  }
});

// Handles Route 53 health checks.
server.get('/health', (request, reply) => {
  reply
    .code(200)
    .header('Content-Type', 'text/plain; charset=utf-8')
    .send('OK');
});

// Handles requests to the main server.
server.get('*', (request, reply) => {
  // get the event passed in from API Gateway.
  const event = JSON.parse(
    decodeURIComponent(request.headers['x-apigateway-event'])
  );
  log.debug('EVENT', event);

  const { head, html, css } = App.render({ url: event.path });

  // Send the response.
  reply.code(200).headers({
    'Content-Type': 'text/html; charset=utf-8',
    'x-region': process.env.REGION // Allows for testing the regional deployments.
  }).send(`<html><link rel='stylesheet' href='/global.css'>
    <link rel='stylesheet' href='/bundle.css'>${html}<script src="/assets/bundle.js"></script></html>`);
});

// Executed on AWS Lambda.
module.exports = server;
