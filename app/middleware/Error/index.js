/**
 * ErrorMiddleware Singleton
 * uses app
 */

/**
 * @class ErrorMiddleware
 */
var ErrorMiddleware = {
  inject: 'app',
  load: function(app) {
    // catch 404 and forward to error handler
    /**
     * @private defaultError
     * default 404 handler
     */
    function defaultError() {
      app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      });
    }

    /**
     * @private devError
     * development error handler, will provide stack trace
     */
    function devError() {
      if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
          res.status(err.status || 500);
          res.render('error', {
            message: err.message,
            error: err
          });
        });
      }
    }

    /**
     * @private prodError
     * production error handler, will produce error message without stacktrace
     */
    function prodError() {
      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
          message: err.message,
          error: {}
        });
      });
    }

    defaultError();
    devError();
    prodError();
  }
};

module.exports = ErrorMiddleware;
