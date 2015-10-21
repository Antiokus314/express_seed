var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Mincer = require('mincer');

function MiddlewareLoader(app, path) {
  this.app = app;
  this.path = path;
}

MiddlewareLoader.prototype.basic = function basic() {
  var self = this;
  self.app.set('views', self.path.join(__dirname, '..', 'app', 'views'));
  self.app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  self.app.use(logger('dev'));
  self.app.use(bodyParser.json());
  self.app.use(bodyParser.urlencoded({ extended: false }));
  self.app.use(cookieParser());
  //app.use(express.static(path.join(__dirname, 'public')));
};

MiddlewareLoader.prototype.assets = function assets() {
  var self = this;
  var env = new Mincer.Environment(self.path.join(__dirname, '..'));
  env.appendPath(self.path.join(__dirname, '..', 'app', 'assets', 'stylesheets'))
  env.appendPath(self.path.join(__dirname, '..', 'app', 'assets', 'javascripts'))
  env.appendPath(self.path.join(__dirname, '..', 'app', 'assets', 'images'))

  self.app.use('/assets', Mincer.createServer(env));
};

MiddlewareLoader.prototype.errors = function errors() {
  var self = this;
  // catch 404 and forward to error handler
  self.app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (self.app.get('env') === 'development') {
    self.app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  self.app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
};

module.exports = MiddlewareLoader;
