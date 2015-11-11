// Update with your config settings.
var path = require('path');
var name = require('./package').name;

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: name + '_dev',
      user:     'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: name + '_staging',
      user:     'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: name + '_prod',
      user:     'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname, 'migrations'),
      tableName: 'knex_migrations'
    }
  },

  default: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user:     'postgres'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
