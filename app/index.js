/**
 * require modules
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var Injector = require('easy-di');
var Knex = require('knex');
var Bookshelf = require('bookshelf');

/**
 * set environment for application
 */
var env = process.env.NODE_ENV || 'development';

/**
 * Database loading
 * 1) require the database configuration in the knexfile with the given env variable (set above)
 * 2) load database config into the knex module
 * 3) load knex module into the bookshelf module
 * 4) register the desired plugins
 */
var dbConfig = require('../knexfile')[env];
var knex = Knex(dbConfig);
var bookshelf =  Bookshelf(knex);
bookshelf.plugin('registry');
bookshelf.plugin('visibility');


/**
 * create a new express app
 */
var app = express();

/**
 * set the environment into the app
 */
app.set('env', env);

/**
 * create a new container called "main" and load them with the following modules
 */
Injector.create('main', {
  app: app,
  Router: express.Router,
  Helpers: {},
  Models: {},
  Controllers: {},
  Database: bookshelf
})
.loadDir(path.resolve(__dirname, '..', 'config'))
.loadDir(path.resolve(__dirname, 'utilities'))
.loadDir(path.resolve(__dirname, 'models'))
.loadDir(path.resolve(__dirname, 'helpers'))
.loadList(require(path.resolve(__dirname, 'middleware')));

module.exports = app;
