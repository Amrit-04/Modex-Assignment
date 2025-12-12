import React from 'react';
import { useParams } from 'react-router-dom';
import SlotGrid from '../components/SlotGrid';

const Booking = () => {
    const { id } = useParams<{ id: string }>();
    const locationId = parseInt(id || '0', 10);

    return (
        <div>
            <h2>Select a Slot for Location #{locationId}</h2>
            <SlotGrid locationId={locationId} />
        </div>
    );
};

export default Booking;
