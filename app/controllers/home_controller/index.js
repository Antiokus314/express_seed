module.exports = {
  load: function(controller) {
    /**
     * controller.register
     * @param String path - specify path (url)
     * @param Function callback(router) - express.Router instance provided in callback
     * @returns null
     *
     * Create a controller and load into application
     */
    controller.register('/', function(router) {

      /**
       * This is just an express.Router instance. use as normal
       */
      router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express Seed' });
      });

    });
  }
};
