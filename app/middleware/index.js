var AppContainer = require('easy-di').fetch('main');

var middleware = [
  require('./Basic'),
  require('./View'),
  require('./Asset'),
  require('./Routes'),
  require('./Error')
];


AppContainer.loadList(middleware);
