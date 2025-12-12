import { Request, Response } from 'express';
import { pool } from '../utils/db';


export const createBooking = async (req: Request, res: Response) => {
    const { slot_id, user_id } = req.body;
    const client = await pool.connect();


    try {
        await client.query('BEGIN');
        const slot = await client.query('SELECT * FROM slots WHERE id = $1 FOR UPDATE', [slot_id]);


        if (slot.rows.length === 0 || slot.rows[0].is_booked) {
            await client.query('ROLLBACK');
            return res.status(400).json({ message: 'Slot not available' });
        }


        const expiresAt = new Date(Date.now() + 2 * 60000); // 2 minutes
        await client.query(
            'INSERT INTO bookings (slot_id, user_id, status, expires_at) VALUES ($1, $2, $3, $4)',
            [slot_id, user_id, 'PENDING', expiresAt]
        );


        await client.query('UPDATE slots SET is_booked = TRUE WHERE id = $1', [slot_id]);
        await client.query('COMMIT');


        res.status(201).json({ message: 'Booking created', status: 'PENDING' });
    } catch (err) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: 'Booking failed' });
    } finally {
        client.release();
    }
};
