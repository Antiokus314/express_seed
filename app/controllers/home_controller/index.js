module.exports = function(controller) {
  var homeController = controller('/');

  homeController.register(function(router) {
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express Seed' });
    });
  });
};
