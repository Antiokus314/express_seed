var env = process.env.NODE_ENV || 'development';
var Injector = require('easy-di');
var AppContainer = Injector.create('main');

var express = require('express');
var app = express();

app.set('env', env);
AppContainer.set('app', app);
AppContainer.set('Router', express.Router);

require('../config');
require('./utilities')
require('./middleware')

module.exports = app;
