module.exports = {
  load: function(container) {
    container.get('app', function(app) {
      container.set('Controller', require('./Controller').load(app));
    });
  }
}
