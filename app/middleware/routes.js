var AppContainer = require('injector').fetch('main');
var path = require('path');
var fs = require('fs');
var controllersDir = path.resolve(path.join(__dirname, '..', 'controllers'));

fs.readdirSync(controllersDir).forEach(function(file) {
  var controller = require(path.join(controllersDir, file));
  AppContainer.get(controller.inject, controller.load);
});
