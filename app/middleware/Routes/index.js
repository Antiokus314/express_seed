/**
 * RoutesMiddleware Singleton
 */

var AppContainer = require('easy-di').fetch('main');
var path = require('path');
var controllersDir = path.resolve(path.join(__dirname, '..', '..', 'controllers'));

/**
 * @class RoutesMiddleware
 */
var RoutesMiddleware = {
  inject: [],
  load: function() {

    AppContainer.loadDir(controllersDir);
  }
};

module.exports = RoutesMiddleware;
