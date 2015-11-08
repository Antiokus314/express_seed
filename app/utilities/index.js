var AppContainer = require('easy-di').fetch('main');

var CU = require('./controller');
AppContainer.get(CU.inject, function() {
  var Controller = CU.load.apply(null, arguments);
  AppContainer.set('Controller', Controller);
});
