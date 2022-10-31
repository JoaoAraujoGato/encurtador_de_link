exports.up = function(knex) {
    return knex.schema.createTable("link", function (table) {
        table.string("linkId").primary().notNullable();
        table.string('userId').unsigned().index().references('userId').inTable('user').onDelete("cascade");
        table.string("titulo").notNullable();
        table.string("linkEncurtado").notNullable();
        table.string("linkOriginal").notNullable();
        table.string("contadorCliques").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("link");
};
