exports.up = function(knex) {
    return knex.schema.createTable("link", function (table) {
        table.string("linkId").primary().notNullable();
        table.foreign("userId").references("userId").inTable("user").onDelete("cascade"); //string("userId").notNullable();
        table.string("linkEncurtado").notNullable();
        table.string("linkOriginal").notNullable();
        table.string("contadorCliques").notNullable();
        table.string("qrCode").notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("link");
};
