/**
 * @class ControllerUtility
 * uses - app, Router, Controllers
 */
var ControllerUtility = {
  as: 'Controller',
  inject: ['app', 'Router', 'Controllers'],
  load: function(app, Router, Controllers) {
    /**
     * @class Controller
     */
    var Controller = {
      /**
       * @static define
       * @param {string} name
       * @param {object} definition
       * @param definition.url base url of router
       * @param definition.register function that gets the express.Router and loads the endpoints
       */
      define: function(name, definition) {
        if (definition.url && definition.register) {
          Controllers[name] = definition;
          var router = Router();
          definition.register(router);
          definition.router = router;
          app.use(definition.url, router);
        }
        else {
          throw new Error('controller defintion requires both url string and register method defined');
        }
      }
    };

    return Controller;
  }
};

module.exports = ControllerUtility;
