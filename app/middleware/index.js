var middleware = {
  load: function load(app) {
    require('./basic').load(app);
    require('./assets').load(app);
    require('./routes').load(app);
    require('./errors').load(app);
  }
};

module.exports = middleware;
