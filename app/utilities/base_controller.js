var Router = require('express').Router;

function loadBaseController(app) {
  var base_controller = {
    init: function(url, context) {
      var self = this;
      self.url = url;
      self.context = context || "";
      self.path = self.context + self.url;
    },
    register: function(cb) {
      var self = this;
      var router = Router();
      if (cb) cb(router);
      app.use(self.path, router);
    }
  };

  app.set('base_controller', function(url, context) {
    var controller = Object.create(base_controller);
    controller.init(url, context);
    return controller;
  });
}

module.exports = {
  load: loadBaseController
}
