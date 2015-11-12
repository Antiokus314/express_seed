/**
 * CONTROLLER
 * baseurl: /URL
 */

exports.inject = 'Controller';
exports.load = function(Controller) {
  /**
   * define
   * takes 2 paramaters
   * @param {string} name - name of controller
   * @param {object} definition - properties/methods/routes attached to the controller
   *
   * @param definition.url - url(string) that the injected router instance will live under
   * @param definition.register - a function with a new express.Router instance. define all routes on that instance
   */

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
