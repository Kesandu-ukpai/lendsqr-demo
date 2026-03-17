import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("wallets", (table) => {
    table.uuid("id").primary()
    table
      .uuid("user_id")
      .notNullable()
      .unique()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.decimal("balance", 15, 2).defaultTo(0)
    table.string("currency", 3).notNullable().defaultTo("NGN")
    table.enum("status", ["active", "frozen"]).defaultTo("active")
    table.timestamps(true, true)
  })
}