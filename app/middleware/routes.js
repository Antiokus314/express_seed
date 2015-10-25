var path = require('path');
var controllersDir = path.resolve(path.join(__dirname, '..', 'controllers'));
var fs = require('fs');

var middleware = {
  load: function(container) {
    fs.readdirSync(controllersDir).forEach(function(file) {
      var controller = require(path.join(controllersDir, file));
      container.get(controller.inject, controller.load);
    });
  }
};

module.exports = middleware;
