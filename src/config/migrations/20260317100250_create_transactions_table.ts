import {Knex} from 'knex';

export async function up(knex: Knex) : Promise<void> {
    await knex.schema.createTable('transactions',(table) =>{
        table.uuid('id').primary();
        table.string('reference').unique().notNullable();
        table.enum('type', ['credit','debit']).notNullable();
        table.string('description');
        table.decimal('amount', 15,2);
        table.enum('status',  ['pending', 'completed', 'failed']).defaultTo('completed');
        table.timestamps(true, true);
        table
            .uuid('wallet_id')
            .notNullable()
            .references('id')
            .inTable('wallets')
            .onDelete('CASCADE');
    })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("transactions")
}