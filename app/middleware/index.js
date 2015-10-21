var middleware = {
  load: function load(app, cb) {
    require('./basic').load(app);
    require('./assets').load(app);
    if (cb) cb();
    require('./errors').load(app);
  }
};

module.exports = middleware;
