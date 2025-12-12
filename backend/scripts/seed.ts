import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const seed = async () => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Clear existing data
        console.log('Clearing existing data...');
        await client.query('TRUNCATE bookings, slots, locations RESTART IDENTITY CASCADE');

        // Create Locations
        console.log('Creating locations...');
        const locRes = await client.query(`
      INSERT INTO locations (name, address, total_slots)
      VALUES 
        ('Retro Arcade Garage', '1985 Neon Way', 20),
        ('Cyberpunk Lot', '2077 Blade Ave', 15)
      RETURNING id
    `);
        const locIds = locRes.rows.map(r => r.id);

        // Create Slots
        console.log('Creating slots...');
        const now = new Date();

        for (const locId of locIds) {
            for (let i = 0; i < 10; i++) {
                // Create 10 slots starting from now, each 1 hour long
                const startTime = new Date(now.getTime() + i * 3600000);
                const endTime = new Date(startTime.getTime() + 3600000);

                await client.query(`
          INSERT INTO slots (location_id, start_time, end_time, is_booked)
          VALUES ($1, $2, $3, FALSE)
        `, [locId, startTime, endTime]);
            }
        }

        await client.query('COMMIT');
        console.log('Seeding complete! Added 2 locations and 20 available slots.');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Seeding failed:', err);
    } finally {
        client.release();
        await pool.end();
    }
};

seed();
