import { Knex } from 'knex';
export async function up(knex: Knex): Promise<void> {
    const exists = await knex.schema.hasTable('et_news');
    if (!exists) {
        return knex.schema.createTable('et_news', (table) => {
            table.increments('id').primary();
            table.string('title', 100).notNullable();
            table.text('content').notNullable();
            table.string('author', 255).notNullable();
            table.date('publishDate').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
            table.timestamp('updated_at').defaultTo(knex.fn.now()).notNullable();
        });
    }
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('et_news');
}
