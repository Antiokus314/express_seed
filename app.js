var express = require('express');

var app = express();
var path = require('path');

var Middleware = require('./middleware');
var m = new Middleware(app, path);

m.basic();

m.assets();
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Seed' });
});

m.errors();


module.exports = app;
