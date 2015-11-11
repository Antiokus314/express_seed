/**
 * This is the database create and drop script
 * based on the argument passed in ("create" or "drop") it will create or drop the necessary
 * database configured in the knexfile for the current NODE_ENV - default development
 */
var env = process.env.NODE_ENV || 'development';
var config = require('../knexfile');
var knex = require('knex')({ client: config[env].client, connection: config.default.connection  });

/**
 * @class DBManager
 * manages the drop and create of databases
 */
function err(arg) {
  console.error('Invalid argument', arg);
  process.exit(-1);
}

var DBManager = {
  /**
   * @static run
   * @returns {null}
   *
   * synonymous to main method. Runtime execution
   */
  run: function(arg) {
    if (arg == 'run' || !DBManager[arg]) {
      err(arg);
    }
    else {
      DBManager[arg]();
    }
  },
  /**
   * @static createDB
   * @returns {null}
   *
   * Create the database in the knexfile configuration on the given env
   */
  create: function createDB() {
    knex
      .raw('CREATE DATABASE ' + config[env].connection.database)
      .then(function(success) {
        console.log('Database', config[env].connection.database, 'successfully created');
      })
      .catch(function(err) {
        console.log('Error:', err.message);
      })
      .finally(function() {
        knex.destroy();
      });
  },
  /**
   * @static dropDB
   * @returns {null}
   *
   * Drop the database in the knexfile configuration on the given env
   */
  drop: function dropDB() {
    knex
      .raw('DROP DATABASE ' + config[env].connection.database)
      .then(function() {
        console.log('Database', config[env].connection.database, 'successfully dropped');
      })
      .catch(function(err) {
        console.log('Error:', err.message);
      })
      .finally(function() {
        knex.destroy();
      });
  }
}

DBManager.run(process.argv[2]);
