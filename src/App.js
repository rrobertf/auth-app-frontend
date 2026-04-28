import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // ← ESTO ES CRÍTICO
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const API_URL = 'http://localhost:5001/api';

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
      setCurrentPage('dashboard');
    } catch (error) {
      localStorage.removeItem('token');
      setToken(null);
      setCurrentPage('login');
    }
  };

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setCurrentPage('dashboard');
    } catch (error) {
      alert(error.response?.data?.error || 'Error signing in');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
      const { token: newToken, user: userData } = response.data;
      
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
      setCurrentPage('dashboard');
    } catch (error) {
      alert(error.response?.data?.error || 'Error registering');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="app">
      {currentPage === 'login' && (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={() => setCurrentPage('register')}
          loading={loading}
        />
      )}
      
      {currentPage === 'register' && (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => setCurrentPage('login')}
          loading={loading}
        />
      )}
      
      {currentPage === 'dashboard' && user && (
        <Dashboard 
          user={user}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;