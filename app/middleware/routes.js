var routing = require('express-resource-routing');
var path = require('path');
var controllersDir = path.resolve(path.join(__dirname, '..', 'controllers'));

var middleware = {
  load: function(app) {
    routing.root(app, controllersDir, 'home', 'index');

    if (app.get('env') === 'development') {
      routing.expose_routing_table(app);
    }
  }
};

module.exports = middleware;
