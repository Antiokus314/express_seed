module.exports = function(controller) {
  /**
   * register router path (e.g. app.use('/', ...)
   */
  controller.register('/', function(router) {

    /**
     * This is just an express.Router instance. use as normal
     */
    router.get('/', function(req, res, next) {
      res.render('index', { title: 'Express Seed' });
    });

  });
};
