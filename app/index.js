var env = process.env.NODE_ENV || 'development';
process.env.DEBUG = env === 'development' ? '*:server' : '';

var express = require('express');
var app = express();
var path = require('path');
var utilities = require('./utilities');
var middleware = require('./middleware');

app.set('env', env);

utilities.load(app);
middleware.load(app);

module.exports = app;
