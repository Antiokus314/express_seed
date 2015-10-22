var routing = require('express-resource-routing');
var routes = require('../../config/routes');
var path = require('path');
var controllersDir = path.resolve(path.join(__dirname, '..', 'controllers'));

var middleware = {
  load: function(app) {
    routes.forEach(function(route) {
      if (route.length === 3) {
        routing[route[0]](app, controllersDir, route[1], route[2]);
      }
      if (route.length === 4) {
        routing[route[0]](app, route[1], route[2], route[3]);
      }
    });

    if (app.get('env') === 'development') {
      routing.expose_routing_table(app);
    }
  }
};

module.exports = middleware;
