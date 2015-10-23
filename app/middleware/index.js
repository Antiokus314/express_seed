var middleware = {
  load: function load(container) {
    container.get('app', function(app) {
      require('./basic').load(app);
      require('./views').load(app);
      require('./assets').load(app);
      require('./routes').load(container);
      require('./errors').load(app);
    })
  }
};

module.exports = middleware;
