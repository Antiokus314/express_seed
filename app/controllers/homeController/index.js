
exports.inject = 'Controller';
exports.load = function(Controller) {
  var homeController = Controller.create('homeController', '/');

  homeController.register(function(router) {
    router.get('/', function(req, res, next) {
      console.log(req.method, req.url);
      res.render('index', { title: 'Express Seed' });
    });
  });

  return homeController;
};
