var Mincer = require('mincer');
var path = require('path');

function createAssetPipeline(app) {
  var env = new Mincer.Environment(path.join(__dirname, '..'));
  env.appendPath(path.join(__dirname, '..', 'assets', 'stylesheets'))
  env.appendPath(path.join(__dirname, '..', 'assets', 'javascripts'))
  env.appendPath(path.join(__dirname, '..', 'assets', 'images'))
  app.use('/assets', Mincer.createServer(env));
}

var middleware = { 
  load: function(app, cb) {
    createAssetPipeline(app);
    if (cb) cb();
  }
};

module.exports = function() {
  return Object.create(middleware);
};
