import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/taskDashboard.css';
import { FaCheck, FaTrash, FaPlus } from 'react-icons/fa'; // Import icons

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ name: '', deadline: '', status: false, eventName: '' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/getTasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/getEvents');
        setEvents(response.data); // Assume the API returns an array of events
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Add a new task
  const addTask = async (e) => {
    e.preventDefault();
    try {
      console.log('Task Form Data:', taskForm); // Log taskForm for debugging
      await axios.post('http://localhost:5001/api/postTask', taskForm);
      setTaskForm({ name: '', deadline: '', status: false, eventName: '' }); // Reset the form
      fetchTasks(); // Refresh the tasks list
      console.log('Task added successfully!');
    } catch (error) {
      console.error('Error adding task:', error.response?.data || error.message);
    }
  };

  // Update an existing task's status
  const updateTask = async (name) => {
    try {
      console.log('Updating Task:', name);
      await axios.put('http://localhost:5001/api/changeTaskStatus', { name });
      setEditingTaskId(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (name) => {
    try {
      console.log('Deleting Task:', name);
      await axios.delete('http://localhost:5001/api/deleteTask', { data: { name } });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status).length;
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Task Management Dashboard</h1>

      {/* Task Form */}
      <form className="task-form" onSubmit={editingTaskId ? updateTask : addTask}>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          value={taskForm.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="deadline"
          value={taskForm.deadline}
          onChange={handleInputChange}
        />
        <select
          name="eventName"
          value={taskForm.eventName}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>Select an event</option>
          {events.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
        <button type="submit">
          <FaPlus /> Add Task
        </button>
      </form>

      {/* Progress Bar */}
      <div className="progress-bar-container">
  <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
</div>
<div className={`progress-text ${calculateProgress() === 100 ? 'completed' : ''}`}>
  {`${calculateProgress().toFixed(2)}% Completed`}
</div>

      {/* Task Table */}
      <div className="task-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Event</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</td>
                <td>{task.status ? 'Completed' : 'Pending'}</td>
                <td>{task.event || 'Unlinked'}</td>
                <td>
                  <button
                    className="update-button"
                    onClick={(e) => {
                      e.preventDefault();
                      updateTask(task.name);
                    }}
                  >
                    <FaCheck /> Update Status
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTask(task.name)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}