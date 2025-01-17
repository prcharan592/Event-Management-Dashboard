import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'; // Import the CSS file
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons for password toggle

const Register = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5001/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Show success message
      setSuccess('Registration successful! Redirecting to login...');
      setError('');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your Account</h2>
        <p>Join us and get started today!</p>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form className="register-form" onSubmit={handleSubmit}>
          <input
            name="username"
            type="text"
            required
            className="input-field"
            placeholder="Username"
            onChange={handleChange}
          />
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
          <div className="password-field">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              className="input-field"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <Link to="/login" className="login-link">
          Already have an account? <span className="font-semibold">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;