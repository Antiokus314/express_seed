var componentLoader = {
  init: function() {
    this.components = {};
  },
  get: function(deps, cb) {
    var self = this;
    if (typeof deps === 'string') {
      getOneComponent(self.components, deps, cb);
    }
    else {
      getManyComponents(self.components, deps, cb);
    }
    return self;
  },
  set: function(name, dep) {
    this.components[name] = dep;
    return this;
  }
};

function getOneComponent(components, dep, cb) {
  if (cb) {
    cb(searchObject(components, dep));
  }
}

function getManyComponents(components, deps, cb) {
  if (cb) {
    var depsToSend = new Array(deps.length);
    deps.forEach(function(dep, i) {
      depsToSend[i] = searchObject(components, dep);
    });

    cb.apply(null, depsToSend);
  }
}

function searchObject(obj, searchKeys) {

  function search(o, keys) {
    if (keys.length === 0) {
      return obj;
    }
    else {
      var key = keys[0];
      var found = obj[key];
      if (found) {
        return searchObject(found, keys.splice(1));
      }
      else {
        throw new Error("Key '" + key + "' could not be found");
      }
    }
  }

  var k = typeof searchKeys === 'string' ? searchKeys.split('.') : searchKeys;

  return search(obj, k);
}

module.exports = function() {
  var component = Object.create(componentLoader);
  component.init();
  return component;
}
