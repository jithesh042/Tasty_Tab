import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import Message from '../../components/Message';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const defaultRestaurantId = '688865846837e9cb530c5319'; // <<< IMPORTANT: Update this with a valid restaurant ID from your backend DB

                const res = await api.get(`/menu/${defaultRestaurantId}`);
                setMenuItems(res.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    if (loading) return <div className="text-center p-8">Loading menu...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Our Delicious Menu</h2>
            {error && <Message type="error" message={error} />}
            {menuItems.length === 0 ? (
                <p className="text-center text-gray-600">No menu items available for this restaurant.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {menuItems.map((item) => (
                        <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
                            {item.photo && <img src={item.photo} alt={item.name} className="w-full h-48 object-cover rounded-t-xl" />}
                            <div className="p-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-600 font-bold text-xl">${item.price.toFixed(2)}</span>
                                    {/* Add to cart button would go here for customer view */}
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition duration-300">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Menu;