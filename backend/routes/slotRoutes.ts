import express from 'express';
import { getSlotsByLocation, createSlot } from '../controllers/slotController';


const router = express.Router();
router.get('/:location_id', getSlotsByLocation);
router.post('/', createSlot);


export default router;