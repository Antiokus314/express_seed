var path = require('path');

function loadViewSettings(app) {
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'jade');
}

var middleware = {
  load: function(app) {
    loadViewSettings(app);
  }
};

module.exports = middleware;
