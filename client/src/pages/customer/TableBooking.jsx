import React, { useState, useEffect, useContext } from 'react';
import api from '../../api/api';
import AuthContext from '../../context/AuthContext';
import Message from '../../components/Message';

const TableBooking = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ date: '', time: '', guests: '', restaurantId: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const res = await api.get('/restaurants');
                setRestaurants(res.data);
            } catch (err) {
                setMessage(`Error fetching restaurants: ${err.response?.data?.message || err.message}`);
                setMessageType('error');
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setMessageType('');
        if (!user) {
            setMessage('Please log in to book a table.');
            setMessageType('error');
            return;
        }
        try {
            await api.post('/bookings', { ...formData, customerId: user._id });
            setMessage('Table booked successfully!');
            setMessageType('success');
            setFormData({ date: '', time: '', guests: '', restaurantId: '' }); // Clear form
        } catch (err) {
            setMessage(`Error booking table: ${err.response?.data?.message || err.message}`);
            setMessageType('error');
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading restaurants...</div>;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '1rem' }}>
            <div style={{ backgroundColor: '#ffffff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
                <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', color: '#1f2937', marginBottom: '1.5rem' }}>Book a Table</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label htmlFor="restaurantId" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Select Restaurant:</label>
                        <select
                            id="restaurantId"
                            name="restaurantId"
                            value={formData.restaurantId}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none' }}
                        >
                            <option value="">-- Select a Restaurant --</option>
                            {restaurants.map(res => (
                                <option key={res._id} value={res._id}>{res.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="time" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Time:</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none' }}
                        />
                    </div>
                    <div>
                        <label htmlFor="guests" style={{ display: 'block', color: '#374151', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Number of Guests:</label>
                        <input
                            type="number"
                            id="guests"
                            name="guests"
                            value={formData.guests}
                            onChange={handleChange}
                            min="1"
                            required
                            style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', outline: 'none' }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#10b981',
                            color: 'white',
                            fontWeight: 'bold',
                            padding: '0.5rem',
                            borderRadius: '0.5rem',
                            width: '100%',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#059669'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#10b981'}
                    >
                        Book Now
                    </button>
                </form>
                <div style={{ marginTop: '1rem' }}>
                    <Message type={messageType} message={message} />
                </div>
            </div>
        </div>
    );
};

export default TableBooking;
