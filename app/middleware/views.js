/**
 * @class ViewMiddleware
 * uses app
 */
var path = require('path');

var ViewMiddleware = {
  inject: 'app',
  load: function(app) {
    app.set('views', path.join(__dirname, '..', 'views'));
    app.set('view engine', 'jade');
  }
}

module.exports = ViewMiddleware;
