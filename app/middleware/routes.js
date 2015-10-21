var path = require('path');
var controllers_dir = path.resolve(path.join(__dirname, '..', 'controllers'));
var routing = require('resource-routing');

var middleware = {
  load: function(app) {
    routing.root(app, controllers_dir, 'home', 'index');

    if (app.get('env') === 'development') {
      routing.expose_routing_table(app);
    }
  }
};

module.exports = middleware;
