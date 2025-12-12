import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LocationCard from '../components/LocationCard';

interface Location {
    id: number;
    name: string;
    address: string;
    total_slots_count: number;
    available_slots: number;
}

const Home = () => {
    const [locations, setLocations] = useState<Location[]>([]);

    useEffect(() => {
        axios.get('/api/locations').then((res) => setLocations(res.data));
    }, []);

    return (
        <div>
            <h2>Choose a Parking Location</h2>
            <div className="location-list">
                {locations.map((loc) => (
                    <LocationCard key={loc.id} location={loc} />
                ))}
            </div>
        </div>
    );
};

export default Home;
