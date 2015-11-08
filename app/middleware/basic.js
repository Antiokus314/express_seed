/**
 * BasicMiddlware Singleton
 * uses app
 */

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * @class BasicMiddleware
 */
var BasicMiddleware = {
  inject: 'app',
  load: function(app) {
    // uncomment after placing your favicon in /public
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    // this is the default loading from generating an express app
    // adjust as needed
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
  }
}

module.exports = BasicMiddleware;
