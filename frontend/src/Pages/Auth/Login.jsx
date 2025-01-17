import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import the updated CSS file
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password toggle

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify({
        username: response.data.user.username,
        email: response.data.user.email
      }));
      
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Sign in to your account</p>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            required
            className="input-field"
            placeholder="Email address"
            onChange={handleChange}
          />
          <div className="password-field">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              className="input-field"
              placeholder="Password"
              onChange={handleChange}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="login-button">
            Sign in
          </button>
        </form>
        <Link to="/register" className="register-link">
          Don't have an account? <span>Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Login;