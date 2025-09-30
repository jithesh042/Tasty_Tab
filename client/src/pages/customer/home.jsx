import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import AuthContext from '../../context/AuthContext';

const Home = () => {
    const { user } = useContext(AuthContext); // or just useContext(AuthContext) if context returns user directly

    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">Welcome to Tastytab!</h1>
                <p className="home-description">
                    Experience the freshest ingredients and delightful flavors in every dish.
                    From our signature burgers to exquisite desserts, we promise a culinary journey
                    that will tantalize your taste buds. Book a table or explore our menu today!
                </p>
                <div className="home-buttons">
                    {user?.role === 'customer' && (
                        <div>
                            <Link to="/menu" className="btn menu-btn">
                                View Our Menu
                            </Link>
                            <Link to="/table-booking" className="btn booking-btn">
                                Book a Table
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
