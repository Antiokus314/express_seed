var controller = function(Controller) {

  var homeController = Controller.create('homeController', '/');

  homeController.register(function(router) {
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express Seed' });
    });
  });
}

module.exports = {
  inject: 'Controller',
  load: controller
}
