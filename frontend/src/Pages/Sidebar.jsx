import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import { FaHome, FaCalendarAlt, FaTasks, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData && userData.username) {
      setUsername(userData.username);
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.replace('/login');
  };

  const menuItems = [
    { text: 'Home', path: '/', icon: <FaHome /> },
    { text: 'Event', path: '/event', icon: <FaCalendarAlt /> },
    { text: 'Task Tracker', path: '/tasktracker', icon: <FaTasks /> },
    { text: 'Attendees', path: '/attendees', icon: <FaUsers /> },
  ];

  return (
    <div className="sidebar-container">
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          <span className="logo"><FaBars /></span> {/* Revert to previous menu button */}
        </button>
        <div className={`menu ${isOpen ? '' : 'hidden'}`}>
          {/* User Profile Section */}
          <div className="user-profile">
            <div className="user-avatar">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="user-name">
              Welcome, {username}
            </div>
          </div>

          {/* Menu Items */}
          <ul>
            {menuItems.map((item) => (
              <li key={item.text} className="menu-item">
                <Link to={item.path}>
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.text}</span>
                </Link>
              </li>
            ))}
            <li className="menu-item">
              <button
                onClick={handleLogout}
                className="logout-button"
              >
                <span className="menu-icon"><FaSignOutAlt /></span>
                <span className="menu-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;