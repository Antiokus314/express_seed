var AppContainer = require('easy-di').fetch('main');

[
  require('./basic'),
  require('./views'),
  require('./assets'),
  require('./routes'),
  require('./errors')
].forEach(function(middleware) {
  AppContainer.get(middleware.inject, middleware.load);
});
