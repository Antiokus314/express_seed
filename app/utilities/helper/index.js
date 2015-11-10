/**
 * @class HelperUtility 
 * uses - 
 */
var HelperUtility = {
  as: 'Helper',
  inject: ['Helpers'],
  load: function(Helpers) {
    /**
     * @class Helper
     */
    var Helper = {
      /**
       * @static define
       * @param {string} name
       * @param {object} definition
       */
      define: function(name, definition) {
        if (name && definition) {
          Helpers[name] = definition;
        }
        else {
          throw new Error('helper definition requires name and definition object');
        }
      }
    };

    return Helper;
  }
};

module.exports = HelperUtility;
