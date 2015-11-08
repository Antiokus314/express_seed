var AppContainer = require('easy-di').fetch('main');

[
  require('./Basic'),
  require('./View'),
  require('./Asset'),
  require('./Routes'),
  require('./Error')
].forEach(function(middleware) {
  AppContainer.get(middleware.inject, middleware.load);
});
