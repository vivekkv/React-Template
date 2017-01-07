exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', function (table) {
            table.bigIncrements('id').primary();   
            table.string('username');
            table.string('password');
        })
        .createTable("drivers", function(table) {
            table.bigIncrements('id').primary();   
            table.string('email');
            table.string('mobile');
            table.integer("userId").references('users.id');
        })
        .createTable("riders", function(table) {
            table.bigIncrements('id').primary();   
            table.string('email');
            table.string('mobile');
            table.integer("userId").references('users.id');
        })
        .createTable("userLocation", function(table) {
            table.bigIncrements('id').primary();   
            table.float('latitude');
            table.float('longitude');
            table.float('status');
            table.float('userRole');
            table.integer('userId').references('users.id');
        })
};

exports.down = function (knex, Promise) {

};