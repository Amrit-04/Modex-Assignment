import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


import bookingRoutes from './routes/bookingRoutes';
import locationRoutes from './routes/locationRoutes';
import slotRoutes from './routes/slotRoutes';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api/bookings', bookingRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/slots', slotRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});