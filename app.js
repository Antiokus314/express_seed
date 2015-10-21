var env = process.env.NODE_ENV || 'development';
process.env.DEBUG = env === 'development' ? '*:server' : '';

var express = require('express');
var app = express();
app.set('env', env);

var path = require('path');
var routing = require('resource-routing');
var controllers_dir = path.resolve('./app/controllers');

var middleware = require('./middleware')();

middleware.load(app, function(a) {
  routing.root(app, controllers_dir, 'home', 'index');

  if (app.get('env') === 'development') {
    routing.expose_routing_table(a);
  }
});

module.exports = app;
