import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("users", (table) => {
    table.uuid("id").primary()
    table.string("email").unique().notNullable()
    table.string("first_name")
    table.string("last_name")
    table.string("auth_token").unique()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("users")
}