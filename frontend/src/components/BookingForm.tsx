import React, { useState } from 'react';
import axios from 'axios';

interface Props {
    slotId: number;
    onBooked: () => void;
}

const BookingForm = ({ slotId, onBooked }: Props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleBook = async () => {
        setLoading(true);
        setError('');
        const userId = crypto.randomUUID(); // Generate random User ID

        try {
            await axios.post('/api/bookings', { slot_id: slotId, user_id: userId });
            onBooked();
        } catch (err) {
            setError('Booking failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="booking-form">
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleBook} disabled={loading}>
                {loading ? 'PROCESSING...' : 'BOOK SLOT'}
            </button>
        </div>
    );
};

export default BookingForm;
