var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

function loadBasicSettings(app) {
  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
}

var middleware = {
  load: function(app) {
    loadBasicSettings(app);
  }
};

module.exports = middleware;
