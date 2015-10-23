var env = process.env.NODE_ENV || 'development';
var container = require('../lib/componentLoader')();

var express = require('express');
var app = express();

app.set('env', env);
container.set('app', app);

require('./utilities').load(container);
require('./middleware').load(container);

module.exports = container;
