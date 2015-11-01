var AppContainer = require('injector').fetch('main');
AppContainer.set('ControllerCollection', {});

var c = require('./controller');
AppContainer.get(c.inject, function() {
  var Controller = c.load.apply(null, arguments);
  AppContainer.set('Controller', Controller);
});
