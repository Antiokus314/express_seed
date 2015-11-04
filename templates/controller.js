
exports.inject = 'Controller';
exports.load = function(Controller) {
  var CONTROLLER = Controller.create('CONTROLLER', '/URL');

  CONTROLLER.register(function(router) {
    router.get('/', function(req, res, next) {
      console.log(req.method, req.url);
      res.send('I am the CONTROLLER');
    });
  });

  return CONTROLLER;
};
