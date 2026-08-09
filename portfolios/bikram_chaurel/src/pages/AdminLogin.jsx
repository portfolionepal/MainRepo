import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) navigate('/adminaccess/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const ok = login(username, password);
      if (ok) {
        navigate('/adminaccess/dashboard');
      } else {
        setError('Incorrect username or password.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <span>B</span>
        </div>
        <h1 className="admin-login-title">Admin Access</h1>
        <p className="admin-login-sub">Enter your credentials to manage the portfolio</p>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="admin-username">Username</label>
            <input
              type="text"
              id="admin-username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter admin username"
              autoComplete="username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button type="submit" className="btn-primary" id="admin-login-btn" disabled={loading} style={{width:'100%'}}>
            {loading ? 'Verifying...' : 'Login'}
          </button>
        </form>
        <a href="/" className="admin-back-link">← Back to portfolio</a>
      </div>
    </div>
  );
}
