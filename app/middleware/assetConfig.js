var path = require('path');
var appPath = path.resolve(path.join(__dirname, '..'));
var defaultAssetPath = path.join(appPath, 'assets');


module.exports = {

  assetCompilation: ['(**/*|application).(js|css)', '(**/*|*).(jpg|png|svg|gif)'],
  assetPaths: [
    path.join(defaultAssetPath, 'images'),
    path.join(defaultAssetPath, 'javascripts'),
    path.join(defaultAssetPath, 'stylesheets')
  ],
  assetMacroProcessor: ['.js', '.css', '.scss'],
  mountPoint: '/assets'
}
