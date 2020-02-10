'use strict';
require('make-promises-safe');
const fastify = require('fastify');
const log = require('lambda-log'); // Structured logs
const path = require('path');
const app = require('./public/App.js'); // Compiled Svelte app
const renderMarkup = require('./util/renderMarkup');

// If the DEBUG env variable is true, log.debug() wil send structured logs to CloudWatch.
log.options.debug = process.env.DEBUG;

const server = fastify({
  ignoreTrailingSlash: true
});

// Handle static assets.
server.register(require('fastify-static'), {
  root: path.resolve(__dirname, 'public'),
  prefix: '/assets/',
  setHeaders: function(res) {
    res.setHeader('Cache-Control', 'public, max-age=900'); // One year 31536000
  }
});

// Handles Route 53 health checks. If you're not doing these health checks, it's safe to delete.
server.get('/health', (request, reply) => {
  reply
    .code(200)
    .header('Content-Type', 'text/plain; charset=utf-8')
    .send('OK');
});

// Called during local development.
if (require.main === module) {
  server.get('*', (request, reply) => {
    // Get the rendered markup.
    const markup = renderMarkup(app, request.raw.url);
    // Send the response.
    reply
      .code(200)
      .headers({
        'Content-Type': 'text/html; charset=utf-8',
        'x-region': process.env.REGION // Allows for testing the regional deployments. Safe to delete.
      })
      .send(markup);
  });
  server.listen(3000, err => {
    if (err) console.error(err);
    log.debug('server listening on 3000');
  });
} else {
  // This code is run on Lambda.
  server.get('*', (request, reply) => {
    // Get the event passed in from API Gateway.
    const event = JSON.parse(
      decodeURIComponent(request.headers['x-apigateway-event'])
    );
    // Log the event so that we have it in CloudWatch for debugging.
    log.debug('EVENT', event);

    // Get the rendered markup.
    const markup = renderMarkup(app, event.path);

    // Send the response.
    reply
      .code(200)
      .headers({
        'Content-Type': 'text/html; charset=utf-8',
        'x-region': process.env.REGION // Allows for testing the regional deployments, safe to remove.
      })
      .send(markup);
  });
  // Executed on AWS Lambda.
  module.exports = server;
}
