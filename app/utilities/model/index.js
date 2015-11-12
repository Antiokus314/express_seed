/**
 * @class ModelUtility
 * uses DB, Models
 */
var ModelUtility = {
  as: 'Model',
  inject: ['Database', 'Models'],
  load: function(DB, Models) {
    /**
     * @class Model
     */
    var Model = {
      /**
       * @static define
       * @param {string} name
       * @param {object} definition - bookshelf model definition
       * @returns {object} Model
       */
      define: function(name, type, definition) {
        if (!name) {
          throw new Error('Model/Collection must be named');
        }
        if (type === 'model' || type === 'collection') {
          Models[name] = DB[type](name, definition);
        }
        else {
          throw new Error('Type of model must be either "model" or "collection" not ' + type);
        }

        return Models[name];
      }
    };

    return Model;
  }
}

module.exports = ModelUtility;
