var Router = require('express').Router;

function loadBaseController(app) {
  var base_controller = {
    register: function(url, cb) {
      var router = Router();
      if (cb) cb(router);
      app.use(url, router);
    }
  };

  app.set('base_controller', function() {
    return Object.create(base_controller);
  });
}

module.exports = {
  load: loadBaseController
}
