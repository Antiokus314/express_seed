var routing = require('resource-routing');
var routes = require('../../config/routes');

var middleware = {
  load: function(app) {
    routes.forEach(function(route) {
      routing[route[0]](app, route[1], route[2], route[3]);
    });

    if (app.get('env') === 'development') {
      routing.expose_routing_table(app);
    }
  }
};

module.exports = middleware;
