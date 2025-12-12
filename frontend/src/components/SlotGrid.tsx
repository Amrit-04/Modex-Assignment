import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';

interface Slot {
    id: number;
    start_time: string;
    end_time: string;
    is_booked: boolean;
}

const SlotGrid = ({ locationId }: { locationId: number }) => {
    const [slots, setSlots] = useState<Slot[]>([]);
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

    useEffect(() => {
        axios.get(`/api/slots/${locationId}`).then((res) => setSlots(res.data));
    }, [locationId]);

    const handleSlotClick = (slotId: number, isBooked: boolean) => {
        if (isBooked) return;
        // DOM Manipulation: Toggle selection
        if (selectedSlotId === slotId) {
            setSelectedSlotId(null);
        } else {
            setSelectedSlotId(slotId);
        }
    };

    return (
        <div>
            <div className="slot-grid">
                {slots.map((slot) => (
                    <div
                        key={slot.id}
                        className={`slot ${slot.is_booked ? 'booked' : 'available'} ${selectedSlotId === slot.id ? 'selected' : ''}`}
                        onClick={() => handleSlotClick(slot.id, slot.is_booked)}
                    >
                        {new Date(slot.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                        {new Date(slot.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        <br />
                        <span style={{ fontSize: '8px', color: '#888' }}>(1 Hour)</span>
                        {slot.is_booked ? (
                            <div className="booked-label">⛔ RESERVED</div>
                        ) : (
                            <div style={{ marginTop: '10px', fontSize: '9px' }}>
                                {selectedSlotId === slot.id ? 'SELECTED' : 'CLICK TO SELECT'}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Action Area */}
            {selectedSlotId && (
                <div style={{ textAlign: 'center', marginTop: '30px', borderTop: '2px solid #333', paddingTop: '20px' }}>
                    <h3 className="blink">SLOT #{selectedSlotId} SELECTED</h3>
                    <BookingForm slotId={selectedSlotId} onBooked={() => window.location.reload()} />
                </div>
            )}
        </div>
    );
};

export default SlotGrid;
