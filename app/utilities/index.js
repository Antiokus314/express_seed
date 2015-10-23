module.exports = {
  load: function(container) {
    container.get('app', function(app) {
      var base = require('./base_controller').load(app);
      container.set('baseController', base);
    });
  }
}
