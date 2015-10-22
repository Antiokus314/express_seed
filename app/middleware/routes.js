var path = require('path');
var fs = require('fs');
var controllersDir = path.resolve(path.join(__dirname, '..', 'controllers'));

var middleware = {
  load: function(app) {
    fs.readdirSync(controllersDir).forEach(function(controllerFile) {
      if (controllerFile.indexOf('base_controller') < 0) {
        require(path.join(controllersDir, controllerFile)).load(app);
      }
    });
  }
};

module.exports = middleware;
