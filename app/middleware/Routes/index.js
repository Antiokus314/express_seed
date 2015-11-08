/**
 * RoutesMiddleware Singleton
 */

var AppContainer = require('easy-di').fetch('main');
var path = require('path');
var fs = require('fs');
var controllersDir = path.resolve(path.join(__dirname, '..', '..', 'controllers'));

/**
 * @class RoutesMiddleware
 */
var RoutesMiddleware = {
  inject: [],
  load: function() {
    /**
     * @private loadControllers
     * loop through the controllers directory, load their dependencies and
     * finally load into the application
     */
    function loadControllers() {
      fs.readdirSync(controllersDir).forEach(function(file) {
        var controller = require(path.join(controllersDir, file));
        AppContainer.get(controller.inject, controller.load);
      });
    }

    loadControllers();
  }
};

module.exports = RoutesMiddleware;
