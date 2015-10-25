var path = require('path');

exports.inject = 'app';
exports.load = function(app) {
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'jade');
};
