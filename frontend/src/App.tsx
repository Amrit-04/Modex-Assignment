import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';

// Configure global API base URL for Production (Vercel) vs Local
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="retro-app">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <h1>ParkIt</h1>
                        </a>
                        <Link to="/admin" style={{ color: '#00ffcc', fontSize: '12px' }}>[ ADMIN ACCESS ]</Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/booking/:id" element={<Booking />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
