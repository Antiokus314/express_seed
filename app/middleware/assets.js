var Mincer = require('mincer');
var path = require('path');
var env = new Mincer.Environment(path.join(__dirname, '..'));
var assetConfig = require('../../config/assets');

function createAssetPipeline(app) {
  assetConfig.assetPaths.forEach(function(p) {
    env.appendPath(p);
  });
  app.use(assetConfig.mountPoint, Mincer.createServer(env));
}

function findAsset(file, opts) {
  var asset = env.findAsset(file, opts);
  if (!asset) {
    throw new Error("File [" + file + "] not found");
  } else {
    return path.join(assetConfig.mountPoint, asset.digestPath);
  }
}

env.registerHelper('asset_path', findAsset);

Mincer.MacroProcessor.configure(assetConfig.assetMacroProcessor);

/*
 * js helper (uses findAsset)
 */
function jsAsset(file, opts) {
  return '<script type="application/javascript" src="' + findAsset(file, opts) + '"></script>';
}

/*
 * css helper (uses findAsset)
 */
function cssAsset(file, opts) {
  return '<link type="text/css" rel="stylesheet" href="' + findAsset(file, opts) + '"/>';
}


var middleware = {
  load: function(app) {
    createAssetPipeline(app);
    app.locals.js = jsAsset;
    app.locals.css = cssAsset;
    app.locals.asset_path = findAsset;
  }
};

module.exports = middleware;
