var AppContainer = require('easy-di').fetch('main');

[
  require('./basic'),
  require('./views'),
  require('./assets'),
  require('./routes'),
  require('./errors')
].forEach(function(middleware) {
  if (middleware.inject && middleware.load) {
    AppContainer.get(middleware.inject, middleware.load);
  }
});
