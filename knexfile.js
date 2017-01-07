module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: "./server/db/sqlite/oche.sqlite"
    },
    pool: {
      min: 2, 
      max: 10
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/db/seeds'
    }
  },
  staging: {
    client: 'sqlite3',
    connection: {
      filename: "./server/db/sqlite/oche.sqlite"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/db/seeds'
    }
  },
  production: {
    client: 'sqlite3',
    connection: {
       filename: "./server/db/sqlite/oche.sqlite"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './server/db/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './server/db/seeds'
    }
  }
};
