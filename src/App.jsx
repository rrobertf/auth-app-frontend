import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001/api').replace(/\/$/, '');
const timeout = 10000;
function readToken() {
  // Move a legacy persistent token to tab-scoped storage once, without losing the session.
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  localStorage.removeItem('token');
  if (token) sessionStorage.setItem('token', token);
  return token;
}

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(readToken);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(Boolean(token));
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    let active = true;
    setChecking(true);
    axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }, signal: controller.signal, timeout,
    }).then(response => {
      if (!active) return;
      setUser(response.data.user);
      setCurrentPage('dashboard');
    }).catch(() => {
      if (!active) return;
      sessionStorage.removeItem('token');
      setToken(null);
      setUser(null);
      setCurrentPage('login');
      setError('No se pudo verificar la sesión. Inicia sesión de nuevo.');
    }).finally(() => { if (active) setChecking(false); });
    return () => { active = false; controller.abort(); };
  }, [token]);

  const authenticate = async (route, credentials) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_URL}/auth/${route}`, credentials, { timeout });
      sessionStorage.setItem('token', response.data.token);
      setChecking(true);
      setToken(response.data.token);
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo conectar al servidor');
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setChecking(false);
    setCurrentPage('login');
  };
  if (checking) return <div className="app"><p role="status">Verificando sesión…</p><button onClick={handleLogout}>Cancelar</button></div>;
  return (
    <div className="app">
      {error && <p role="alert">{error}</p>}
      {currentPage === 'login' && <Login onLogin={(email, password) => authenticate('login', { email, password })}
        onSwitchToRegister={() => { setError(''); setCurrentPage('register'); }} loading={loading} />}
      {currentPage === 'register' && <Register onRegister={(username, email, password) => authenticate('register', { username, email, password })}
        onSwitchToLogin={() => { setError(''); setCurrentPage('login'); }} loading={loading} />}
      {currentPage === 'dashboard' && user && <Dashboard user={user} onLogout={handleLogout} />}
    </div>
  );
}
export default App;
