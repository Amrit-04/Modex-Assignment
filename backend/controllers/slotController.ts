import { Request, Response } from 'express';
import { pool } from '../utils/db';


export const getSlotsByLocation = async (req: Request, res: Response) => {
    const { location_id } = req.params;
    try {
        const result = await pool.query(
            'SELECT * FROM slots WHERE location_id = $1 ORDER BY start_time',
            [location_id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch slots' });
    }
};


export const createSlot = async (req: Request, res: Response) => {
    const { location_id, start_time, end_time } = req.body;
    try {
        await pool.query(
            'INSERT INTO slots (location_id, start_time, end_time) VALUES ($1, $2, $3)',
            [location_id, start_time, end_time]
        );
        res.status(201).json({ message: 'Slot created' });
    } catch (err) {
        res.status(500).json({ error: 'Slot creation failed' });
    }
};