var home_controller = require('./base_controller')('/');

home_controller.register(function(router) {

  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express Seed' });
  });

});

module.exports = home_controller;
