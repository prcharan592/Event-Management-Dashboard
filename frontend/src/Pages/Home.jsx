import React from 'react';
import '../styles/Home.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTasks, FaUsers } from 'react-icons/fa'; // Import icons

export default function Home() {
  return (
    <div className="app-container">
      <div className="home-container">
        <div className="welcome-message">
          <h1>Welcome to Event Management Dashboard</h1>
          <p>Manage your events, tasks, and attendees seamlessly.</p>
        </div>
        <div className="cards-container">
          <Link to="/event" className="card-link">
            <div className="card">
              <FaCalendarAlt className="card-icon" />
              <h2>Event Management</h2>
              <p>Manage events efficiently and effectively.</p>
            </div>
          </Link>

          <Link to="/tasktracker" className="card-link">
            <div className="card">
              <FaTasks className="card-icon" />
              <h2>Task Management</h2>
              <p>Keep track of your tasks with ease.</p>
            </div>
          </Link>

          <Link to="/attendees" className="card-link">
            <div className="card">
              <FaUsers className="card-icon" />
              <h2>Attendees Management</h2>
              <p>Handle attendees seamlessly for your events.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}