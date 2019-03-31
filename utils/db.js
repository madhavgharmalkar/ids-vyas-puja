const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production',
    max: 10
})

initialize_database(pool).then((value => {
    console.log('DB init finished')
}))

module.exports = {
    query: (text, params) => pool.query(text, params)
}

async function initialize_database(pool) {
    console.log('DB init started')

    await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    await pool.query(`
        CREATE TABLE IF NOT EXISTS user_data (
            user_id uuid DEFAULT uuid_generate_v4(),
            name VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            password VARCHAR,
            UNIQUE (user_id, email),
            PRIMARY KEY (email)
        );
    `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS offerings (
            offering_id uuid DEFAULT uuid_generate_v4(),
            user_id uuid,
            offering VARCHAR NOT NULL,
            private BOOLEAN NOT NULL DEFAULT FALSE,
            anon BOOLEAN NOT NULL DEFAULT FALSE,
            created_at timestamptz default now(),
            UNIQUE (offering_id, user_id),
            PRIMARY KEY (user_id)
        );
    `)

    await pool.query(`
        CREATE TABLE IF NOT EXISTS offering_likes (
            user_id uuid,
            offering_id uuid,
            UNIQUE (user_id, offering_id),
            PRIMARY KEY (user_id, offering_id)
        );
    `)
}