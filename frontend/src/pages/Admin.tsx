import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

interface Location {
    id: number;
    name: string;
    address: string;
    total_slots: number;
}

const Admin = () => {
    const { isAdmin, login, logout } = useAuth();
    const [locations, setLocations] = useState<Location[]>([]);
    const [formData, setFormData] = useState({ name: '', address: '', total_slots: 10 });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = () => {
        axios.get('/api/locations').then(res => setLocations(res.data));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.address) {
            setError('All fields are required');
            return;
        }
        setError('');
        setSuccess('');

        try {
            await axios.post('/api/locations', formData);
            setSuccess('Location created successfully!');
            setFormData({ name: '', address: '', total_slots: 10 });
            fetchLocations();

            // Also Auto-create slots for this location (Mocking a real flow)
            // Note: In a real app, we might want a separate UI for this.
        } catch (err) {
            setError('Failed to create location');
        }
    };

    if (!isAdmin) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Admin Access Required</h2>
                <button onClick={login} style={{ padding: '10px 20px', background: '#00ffcc', border: 'none', cursor: 'pointer' }}>
                    Login as Admin (Mock)
                </button>
            </div>
        );
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Admin Dashboard</h2>
                <button onClick={logout} style={{ background: 'red', color: 'white', border: 'none', padding: '5px' }}>Logout</button>
            </div>

            <div className="admin-section" style={{ border: '2px solid #00ffcc', padding: '20px', marginBottom: '20px' }}>
                <h3>Create New Location</h3>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message" style={{ color: '#00ffcc' }}>{success}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        placeholder="Location Name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{ padding: '10px', background: '#222', color: '#fff', border: '1px solid #555' }}
                    />
                    <input
                        placeholder="Address"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        style={{ padding: '10px', background: '#222', color: '#fff', border: '1px solid #555' }}
                    />
                    <label>Total Slots:
                        <input
                            type="number"
                            value={formData.total_slots}
                            onChange={e => setFormData({ ...formData, total_slots: parseInt(e.target.value) })}
                            style={{ padding: '10px', background: '#222', color: '#fff', border: '1px solid #555', marginLeft: '10px' }}
                        />
                    </label>
                    <button type="submit" style={{ padding: '10px', background: '#00ffcc', border: 'none', cursor: 'pointer' }}>
                        CREATE LOCATION
                    </button>
                </form>
            </div>

            <h3>Existing Locations</h3>
            <ul>
                {locations.map(loc => (
                    <li key={loc.id} style={{ marginBottom: '5px', color: '#888' }}>
                        <span style={{ color: '#fff' }}>{loc.name}</span> - {loc.address}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;
