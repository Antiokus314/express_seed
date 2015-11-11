var path = require('path');
var defaultAssetPath = path.resolve(path.join(__dirname, '..', 'app', 'assets'));

exports.inject = [];
exports.as = 'AssetConfig';
exports.load = function() {
  var config = {
    assetCompilation: ['(**/*|application).(js|css)', '(**/*|*).(jpg|png|svg|gif)'],
    assetPaths: [
      path.join(defaultAssetPath, 'images'),
      path.join(defaultAssetPath, 'javascripts'),
      path.join(defaultAssetPath, 'stylesheets')
    ],
    assetMacroProcessor: ['.js', '.css', '.scss'],
    mountPoint: '/assets'
  };

  return config;
};
