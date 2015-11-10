/**
 * CONTROLLER
 * baseurl: /URL
 */

exports.inject = 'Controller';
exports.load = function(Controller) {

  Controller.define('CONTROLLER', {
    /**
     * baseurl for your router to exist under
     */
    url: '/URL',
    /**
     * Define the routes on the express.Router instance that is available to you here
     */
    register: function(router) {
        
      router.get('/', function(req, res, next) {
        res.send('I am the CONTROLLER');
      });

    }
  });
};
