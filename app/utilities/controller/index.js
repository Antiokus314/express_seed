/**
 * Controller Base Class
 * uses - app, Router, ControllerCollection
 */
var bodyParser = require('body-parser');

// inject required dependencies
exports.inject = ['app', 'Router', 'ControllerCollection'];
exports.load = function(app, Router, ControllerCollection) {

  /**
   * @class Controller
   */
  var Controller = {
    /**
     * @static create
     * @param {string} name
     * @param {string} url
     * @returns {object} controller instance
     *
     * @description
     * use Controller.create(name, url) instead of new Controller(name, url)
     */
    create: function(name, url) {
      var controller = Object.create(Controller.prototype);
      controller.name = name;
      controller.url = url;
      ControllerCollection[controller.name] = controller;
      return controller;
    },
    prototype: {
      /**
       * @instance register
       * @param {function} callback
       * @returns {null}
       *
       * @description
       * register method gets called with an express.Router instance
       * once the callback is executed, the router gets loaded onto the app
       */
      register: function(cb) {
        if (typeof cb != 'function') {
          throw new Error('Controller.register method requires callback function');
        }
        var self = this;
        var router = Router();
        cb(router);
        app.use(self.url, router);
      }
    }
  };

  return Controller;
};
