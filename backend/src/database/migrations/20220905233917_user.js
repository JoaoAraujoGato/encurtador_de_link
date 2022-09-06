exports.up = function(knex) {
    return knex.schema.createTable("user", function (table) {
        table.string('userId').primary().notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('firebaseId').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("user");
};
