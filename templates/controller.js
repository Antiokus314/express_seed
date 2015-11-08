/**
 * CONTROLLER
 * baseurl: URL
 */

exports.inject = 'Controller';
exports.load = function(Controller) {
  var CONTROLLER = Controller.create('CONTROLLER', '/URL');

  CONTROLLER.register(function(router) {

    router.get('/', function(req, res, next) {
      res.send('I am the CONTROLLER');
    });

  });

  return CONTROLLER;
};
