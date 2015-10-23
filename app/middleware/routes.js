var path = require('path');
var fs = require('fs');
var controllersDir = path.resolve(path.join(__dirname, '..', 'controllers'));

var middleware = {
  load: function(container) {
    fs.readdirSync(controllersDir).forEach(function(controllerFile) {
      var controller = require(path.join(controllersDir, controllerFile));
      container.get(controller.inject, controller.load);
    });
  }
};

module.exports = middleware;
