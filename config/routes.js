var path = require('path');
var defaultControllersDir = path.resolve(path.join(__dirname, '..', 'app','controllers'));

module.exports = [
  ["root", defaultControllersDir, "home", "index"]
];
