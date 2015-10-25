var env = process.env.NODE_ENV || 'development';
var Injector = require('injector');
var container = Injector.create();

var express = require('express');
var app = express();

app.set('env', env);
container.set('app', app);

require('./utilities').load(container);
require('./middleware').load(container);

module.exports = app;
