import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const runTests = async () => {
    try {
        // 1. Create Location
        console.log('Creating Location...');
        const locRes = await axios.post(`${API_URL}/locations`, {
            name: 'Test Location',
            address: '123 Test St',
            total_slots: 5,
        });
        console.log('Location Created:', locRes.data);

        // 2. Get Locations
        console.log('Fetching Locations...');
        const locsRes = await axios.get(`${API_URL}/locations`);
        console.log('Locations:', locsRes.data);
        const locationId = locsRes.data[0].id;

        // 3. Create Slot
        console.log(`Creating Slot for Location ${locationId}...`);
        const slotRes = await axios.post(`${API_URL}/slots`, {
            location_id: locationId,
            start_time: new Date().toISOString(),
            end_time: new Date(Date.now() + 3600000).toISOString(),
        });
        console.log('Slot Created:', slotRes.data);

        // 4. Get Slots
        console.log(`Fetching Slots for Location ${locationId}...`);
        const slotsRes = await axios.get(`${API_URL}/slots/${locationId}`);
        console.log('Slots:', slotsRes.data);

    } catch (err: any) {
        console.error('Test Failed:', err.response ? err.response.data : err.message);
    }
};

runTests();
