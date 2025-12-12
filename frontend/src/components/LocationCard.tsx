import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    location: {
        id: number;
        name: string;
        address: string;
        total_slots_count: number;
        available_slots: number;
    };
}

const LocationCard = ({ location }: Props) => {
    const navigate = useNavigate();

    const goToBooking = () => {
        navigate(`/booking/${location.id}`);
    };

    return (
        <div className="location-card" onClick={goToBooking}>
            <h3>{location.name}</h3>
            <p>{location.address}</p>
            <p style={{ color: '#00ffcc', fontSize: '10px', marginTop: '10px' }}>
                STATUS: {location.available_slots} / {location.total_slots_count} FREE
            </p>
        </div>
    );
};

export default LocationCard;
