var express = require('express');

var app = express();
var path = require('path');



var middleware = require('./middleware')();

middleware.load(app, function(a) {
  a.get('/', function(req, res, next) {
    res.render('index', { title: 'Express Seed' });
  });
});

module.exports = app;
