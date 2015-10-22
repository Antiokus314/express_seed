var Router = require('express').Router;

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
    cb(router);
    self.router = router;
  },
  load: function(app) {
    var self = this;
    app.use(self.path, self.router);
  }
};

module.exports = function(url, context) {
  var controller = Object.create(base_controller);
  controller.init(url, context);
  return controller;
};
