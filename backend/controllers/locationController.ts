import { Request, Response } from 'express';
import { pool } from '../utils/db';


export const getAllLocations = async (_req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT 
                l.id, 
                l.name, 
                l.address, 
                COUNT(s.id)::int as total_slots_count,
                SUM(CASE WHEN s.is_booked = FALSE THEN 1 ELSE 0 END)::int as available_slots
            FROM locations l
            LEFT JOIN slots s ON l.id = s.location_id
            GROUP BY l.id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch locations' });
    }
};


export const createLocation = async (req: Request, res: Response) => {
    const { name, address, total_slots } = req.body;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // 1. Create Location
        const locRes = await client.query(
            'INSERT INTO locations (name, address, total_slots) VALUES ($1, $2, $3) RETURNING id',
            [name, address, total_slots]
        );
        const locationId = locRes.rows[0].id;

        // 2. Auto-generate Slots
        const now = new Date();
        for (let i = 0; i < total_slots; i++) {
            const startTime = new Date(now.getTime() + i * 3600000); // 1 hour intervals
            const endTime = new Date(startTime.getTime() + 3600000);

            await client.query(
                'INSERT INTO slots (location_id, start_time, end_time, is_booked) VALUES ($1, $2, $3, FALSE)',
                [locationId, startTime, endTime]
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Location and slots created successfully' });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Location creation failed' });
    } finally {
        client.release();
    }
};