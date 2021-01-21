exports.up = function (knex) {
  return knex.schema.createTable("messages", (table) => {
    table.string("message_id").primary();
    table.string("message_user").notNullable();
    table.string("message_content").notNullable();

    table.timestamp("updateAt").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.timestamp("createdAt").defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("messages");
};
