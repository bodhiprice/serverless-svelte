'use strict';
require('make-promises-safe');
const fastify = require('fastify');
const log = require('lambda-log');
const path = require('path');
const app = require('./public/App.js');
const renderMarkup = require('./util/renderMarkup');

log.options.debug = process.env.DEBUG;

log.debug('REGION', process.env.REGION);

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

// Handles Route 53 health checks. If you're not doing these health checks, it's safe to delete.
server.get('/health', (request, reply) => {
  reply
    .code(200)
    .header('Content-Type', 'text/plain; charset=utf-8')
    .send('OK');
});

if (require.main === module) {
  // Called directly i.e. "node app"
  // Handles requests to the main server.
  server.get('*', (request, reply) => {
    // Get the rendered markup.
    const markup = renderMarkup(app, request.raw.url);
    // Send the response.
    reply
      .code(200)
      .headers({
        'Content-Type': 'text/html; charset=utf-8',
        'x-region': process.env.REGION // Allows for testing the regional deployments.
      })
      .send(markup);
  });
  server.listen(3000, err => {
    if (err) console.error(err);
    log.debug('server listening on 3000');
  });
} else {
  // Handles requests to the main server.
  server.get('*', (request, reply) => {
    // Get the event passed in from API Gateway.
    const event = JSON.parse(
      decodeURIComponent(request.headers['x-apigateway-event'])
    );
    // Log the event so that we have it in CloudWatch.
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
