exports.up = function (knex) {
    return knex.schema
        .createTable('letters', tbl => {
            tbl.increments('id');
            tbl.text('position').notNullable().unique();
            tbl.text('letter').notNullable().unique();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists('letters');
};
