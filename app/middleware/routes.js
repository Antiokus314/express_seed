var path = require('path');
var fs = require('fs');
var controllersDir = path.resolve(path.join(__dirname, '..', 'controllers'));

var middleware = {
  load: function(app) {
    var base = app.get('base_controller');
    fs.readdirSync(controllersDir).forEach(function(controllerFile) {
      var controller = require(path.join(controllersDir, controllerFile))(base);
      app.use(controller.path, controller.router);
    });
  }
};

module.exports = middleware;
