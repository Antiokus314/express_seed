/**
 * homeController
 * baseurl: /
 */

exports.inject = 'Controller';
exports.load = function(Controller) {

  Controller.define('homeController', {
    /**
     * baseurl for your router to exist under
     */
    url: '/',
    /**
     * Define the routes on the express.Router instance that is available to you here
     */
    register: function(router) {
        
      router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express Seed' });
      });

    }
  });
};
