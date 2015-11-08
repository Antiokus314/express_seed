/**
 * ViewMiddleware Singleton
 * uses app
 */
var path = require('path');

/**
 * @class ViewMiddleware
 */
var ViewMiddleware = {
  inject: 'app',
  load: function(app) {
    app.set('views', path.join(__dirname, '..', '..', 'views'));
    app.set('view engine', 'jade');
  }
}

module.exports = ViewMiddleware;
