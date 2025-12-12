import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

const createDb = async () => {
    // Connect to default 'postgres' database to create new db
    const client = new Client({
        connectionString: process.env.DATABASE_URL?.replace('/parkit', '/postgres'),
    });

    try {
        await client.connect();
        // Check if database exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'parkit'");
        if (res.rowCount === 0) {
            console.log('Creating database parkit...');
            await client.query('CREATE DATABASE parkit');
        } else {
            console.log('Database parkit already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
};

const runSchema = async () => {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        const schemaPath = path.join(__dirname, '../../database/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        console.log('Applying schema...');
        await client.query(schema);
        console.log('Schema applied successfully.');
    } catch (err) {
        console.error('Error applying schema:', err);
        process.exit(1);
    } finally {
        await client.end();
    }
};

const main = async () => {
    await createDb();
    await runSchema();
};

main();
