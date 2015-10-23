var Router = require('express').Router;

function loadBaseController(app) {
  var base_controller = {
    register: function(url, cb) {
      var router = Router();
      if (cb) cb(router);
      app.use(url, router);
    }
  };

  return Object.create(base_controller);
}

module.exports = {
  load: function(app) {
    return loadBaseController(app);
  }
};
