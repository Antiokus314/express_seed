var env = process.env.NODE_ENV || 'development';
process.env.DEBUG = env === 'development' ? '*:server' : '';

var express = require('express');
var app = express();
var path = require('path');
var routing = require('resource-routing');
var middleware = require('./middleware');


app.set('env', env);
var controllers_dir = path.resolve(path.join(__dirname, 'controllers'));

middleware.load(app, function() {
  routing.root(app, controllers_dir, 'home', 'index');

  if (app.get('env') === 'development') {
    routing.expose_routing_table(app);
  }
});

module.exports = app;
