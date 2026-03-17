import {Knex} from 'knex';

export async function up(knex: Knex) : Promise<void> {
    await knex.schema.createTable('transactions',(table) =>{
        table.uuid('id').primary();
        table.string('reference').unique().notNullable();
        table.enum('type', ['credit','debit']).notNullable();
        table.string('description');
        table.decimal('amount');
        table.enum('status',  ['pending', 'completed', 'failed']).defaultTo('completed');
        table.timestamp(true, true);
        table
            .uuid('wallet_id')
            .notNullable()
            .references('id')
            .inTable('wallets')
            .onDelete('CASCADE';)
    })
}

import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary()

    // Unique reference for idempotency & grouping (very important)
    table.string("reference").notNullable().unique()

    // Wallet this transaction belongs to
    table
      .uuid("wallet_id")
      .notNullable()
      .references("id")
      .inTable("wallets")
      .onDelete("CASCADE")

    // Transaction type
    table
      .enum("type", ["credit", "debit"])
      .notNullable()

    // Amount
    table.decimal("amount", 15, 2).notNullable()

    // Transaction status
    table
      .enum("status", ["pending", "completed", "failed"])
      .defaultTo("completed")

    // Optional description
    table.string("description")

    // Metadata (for flexibility)
    table.json("metadata")

    table.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions")
}