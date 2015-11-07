/**
 * AssetMiddleware Singleton
 * uses AssetConfig, app
 */
var Mincer = require('mincer');
var path = require('path');
var env = new Mincer.Environment(path.join(__dirname, '..', '..'));

// inject dependencies
exports.inject = ['AssetConfig', 'app'];
exports.load = function(AssetConfig, app) {
  // load macro-processor config (allows the usage of "$$ asset $$" in specified extensions
  Mincer.MacroProcessor.configure(AssetConfig.assetMacroProcessor);

  /**
   * @class AssetMiddleware
   * @classdesc middleware singleton object
   */
  var AssetMiddleware = {
    /**
     * @static loadAssetPaths
     * load the asset paths defined in the AssetConfig
     */
    loadAssetPaths: function() {
      AssetConfig.assetPaths.forEach(function(p) {
        env.appendPath(p);
      });
    },
    /**
     * @static createAssetPipeline
     * to be called after loading asset paths. Creates a local server instance to serve up assets
     * gets loaded into the app instance as middleware
     */
    createAssetPipeline: function() {
      app.use(AssetConfig.mountPoint, Mincer.createServer(env));
    },
    /**
     * @static findAsset
     * @param {string} file
     * @param {object} [opts]
     * @return {string} path to asset file
     */
    findAsset: function(file, opts) {
      var asset = env.findAsset(file, opts);
      if (!asset) {
        throw new Error("File [" + file + "] not found");
      } else {
        return path.join(AssetConfig.mountPoint, asset.digestPath);
      }
    },
    /**
     * @static jsAsset
     * @param {string} file
     * @param {object} opts
     * @return {string} js script tag with loaded asset path
     */
    jsAsset: function(file, opts) {
      return '<script type="application/javascript" src="' + AssetMiddleware.findAsset(file, opts) + '"></script>';
    },
    /**
     * @static cssAsset
     * @param {string} file
     * @param {object} opts
     * @return {string} css link tag with loaded asset path
     */
    cssAsset: function cssAsset(file, opts) {
      return '<link type="text/css" rel="stylesheet" href="' + AssetMiddleware.findAsset(file, opts) + '"/>';
    }
  }

  // run AssetMiddleware
  AssetMiddleware.loadAssetPaths();
  AssetMiddleware.createAssetPipeline();
  env.registerHelper('asset_path', AssetMiddleware.findAsset);
  app.locals.asset_path = AssetMiddleware.findAsset;
  app.locals.css = AssetMiddleware.cssAsset;
  app.locals.js = AssetMiddleware.jsAsset;

  return AssetMiddleware;
};
