var Mincer = require('mincer');
var path = require('path');
var env = new Mincer.Environment(path.join(__dirname, '..', '..'));

exports.inject = ['AssetConfig', 'app'];
exports.load = function(AssetConfig, app) {
  Mincer.MacroProcessor.configure(AssetConfig.assetMacroProcessor);

  var AssetMiddleware = {
    loadAssetPaths: function() {
      AssetConfig.assetPaths.forEach(function(p) {
        env.appendPath(p);
      });
    },
    createAssetPipeline: function() {
      app.use(AssetConfig.mountPoint, Mincer.createServer(env));
    },
    findAsset: function(file, opts) {
      var asset = env.findAsset(file, opts);
      if (!asset) {
        throw new Error("File [" + file + "] not found");
      } else {
        return path.join(AssetConfig.mountPoint, asset.digestPath);
      }
    },
    /*
     * js helper (uses findAsset)
     */
    jsAsset: function(file, opts) {
      return '<script type="application/javascript" src="' + AssetMiddleware.findAsset(file, opts) + '"></script>';
    },
    /*
     * css helper (uses findAsset)
     */
    cssAsset: function cssAsset(file, opts) {
      return '<link type="text/css" rel="stylesheet" href="' + AssetMiddleware.findAsset(file, opts) + '"/>';
    }
  }

  AssetMiddleware.loadAssetPaths();
  AssetMiddleware.createAssetPipeline();
  env.registerHelper('asset_path', AssetMiddleware.findAsset);
  app.locals.asset_path = AssetMiddleware.findAsset;
  app.locals.css = AssetMiddleware.cssAsset;
  app.locals.js = AssetMiddleware.jsAsset;

  return AssetMiddleware;
};
