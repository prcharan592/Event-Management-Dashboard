import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Attendees from './Pages/Attendees';
import TaskTracker from './Pages/TaskTracker';
import Event from './Pages/Event';
import Sidebar from './Pages/Sidebar';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Layout Component with Sidebar
const DashboardLayout = ({ children }) => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
    };

    checkAuth();
    // Add event listener for storage changes
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" /> : <Register setIsAuthenticated={setIsAuthenticated} />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Home />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/event"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Event />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasktracker"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TaskTracker />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendees"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <Attendees />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch all unknown routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;