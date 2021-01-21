exports.up = function (knex) {
  return knex.schema.createTable("message_history", (table) => {
    table.string("history_id").primary();
    table.string("history_user").notNullable();
    table.string("history_content").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("message_history");
};
