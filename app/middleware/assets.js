/**
 * AssetMiddleware Singleton
 * uses AssetConfig, app
 */
var Mincer = require('mincer');
var path = require('path');
var env = new Mincer.Environment(path.join(__dirname, '..', '..'));

var AssetMiddleware = {
  // inject dependencies
  inject: ['AssetConfig', 'app'],
  load: function(AssetConfig, app) {
    // load macro-processor config (allows the usage of "$$ asset $$" in specified extensions
    Mincer.MacroProcessor.configure(AssetConfig.assetMacroProcessor);

    /**
     * @private loadAssetPaths
     * load the asset paths defined in the AssetConfig
     */
    function loadAssetPaths() {
      AssetConfig.assetPaths.forEach(function(p) {
        env.appendPath(p);
      });
    }

    /**
     * @private createAssetPipeline
     * to be called after loading asset paths. Creates a local server instance to serve up assets
     * gets loaded into the app instance as middleware
     */
    function createAssetPipeline() {
      app.use(AssetConfig.mountPoint, Mincer.createServer(env));
    }

    /**
     * @private findAsset
     * @param {string} file
     * @param {object} [opts]
     * @return {string} path to asset file
     */
    function findAsset(file, opts) {
      var asset = env.findAsset(file, opts);
      if (!asset) {
        throw new Error("File [" + file + "] not found");
      } else {
        return path.join(AssetConfig.mountPoint, asset.digestPath);
      }
    }

    /**
     * @private jsAsset
     * @param {string} file
     * @param {object} opts
     * @return {string} js script tag with loaded asset path
     */
    function jsAsset(file, opts) {
      return '<script type="application/javascript" src="' + findAsset(file, opts) + '"></script>';
    }

    /**
     * @private cssAsset
     * @param {string} file
     * @param {object} opts
     * @return {string} css link tag with loaded asset path
     */
    function cssAsset(file, opts) {
      return '<link type="text/css" rel="stylesheet" href="' + findAsset(file, opts) + '"/>';
    }

    /**
     * execution
     * 1) load asset paths
     * 2) create asset pipeline
     * 3) register asset path finder into environment
     * 4) load asset finders (generic, js and css) into app.locals
     */
    loadAssetPaths();
    createAssetPipeline();
    env.registerHelper('asset_path', findAsset);
    app.locals.asset_path = findAsset;
    app.locals.css = cssAsset;
    app.locals.js = jsAsset;
  }
}

module.exports = AssetMiddleware;
