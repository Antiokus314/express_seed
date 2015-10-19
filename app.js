var express = require('express');

var app = express();
require('./middleware/default').load(app, require('path'), require('morgan'), require('cookie-parser'), require('body-parser'));
require('./middleware/error_handlers').load(app);
module.exports = app;
