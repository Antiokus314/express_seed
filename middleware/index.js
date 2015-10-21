var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Mincer = require('mincer');
var path = require('path');

function createAssetPipeline(app) {
  var env = new Mincer.Environment(path.join(__dirname, '..'));
  env.appendPath(path.join(__dirname, '..', 'app', 'assets', 'stylesheets'))
  env.appendPath(path.join(__dirname, '..', 'app', 'assets', 'javascripts'))
  env.appendPath(path.join(__dirname, '..', 'app', 'assets', 'images'))
  app.use('/assets', Mincer.createServer(env));
}

function loadBasicSettings(app) {
  app.set('views', path.join(__dirname, '..', 'app', 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  //app.use(express.static(path.join(__dirname, 'public')));
}

function loadErrors(app) {
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

var middleware = {
  load: function load(app, cb) {
    loadBasicSettings(app);
    createAssetPipeline(app);
    if (cb) {
      cb(app);
    }
    loadErrors(app);
  }
};

module.exports = function() {
  return (Object.create(middleware));
};
