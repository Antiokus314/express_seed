exports.inject = ['app', 'Router', 'ControllerCollection'];
exports.load = function(app, Router, ControllerCollection) {

  var Controller = {
    create: function(name, url) {
      var controller = Object.create(Controller.prototype);
      controller.name = name;
      controller.url = url;
      ControllerCollection[controller.name] = controller;
      return controller;
    },
    prototype: {
      register: function(cb) {
        var self = this;
        var router = Router();
        if (cb) {
          cb(router);
        }
        app.use(self.url, router);
      }
    }
  };

  return Controller;
};
