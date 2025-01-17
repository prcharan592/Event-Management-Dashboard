import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Attendees.css";
import { FaUserPlus, FaTrash } from "react-icons/fa"; // Import icons

const Attendees = () => {
  const [attendees, setAttendees] = useState([]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newAttendee, setNewAttendee] = useState({ name: "", eventName: "", taskName: "" });

  // Fetch attendees from the server
  const fetchAttendees = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/getAttendees");
      setAttendees(response.data);
    } catch (error) {
      console.error("Error fetching attendees:", error);
    }
  };

  // Fetch events from the server
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/getEvents");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/getTasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Add a new attendee
  const addAttendee = async () => {
    if (newAttendee.name === "" || newAttendee.eventName === "" || newAttendee.taskName === "") {
      alert("All fields are required!");
      return;
    }
    try {
      await axios.post("http://localhost:5001/api/postAttendee", newAttendee);
      fetchAttendees();
      setNewAttendee({ name: "", eventName: "", taskName: "" });
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  // Delete an attendee
  const deleteAttendee = async (name) => {
    try {
      await axios.delete("http://localhost:5001/api/deleteAttendee", {
        data: { name: name },
      });
      fetchAttendees();
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  useEffect(() => {
    fetchAttendees();
    fetchEvents();
    fetchTasks();
  }, []);

  return (
    <div className="dashboard">
      <h1>Attendees Dashboard</h1>

      {/* Add Attendee Form */}
      <div className="add-attendee">
        <h2>Add Attendee</h2>
        <input
          type="text"
          placeholder="Attendee Name"
          value={newAttendee.name}
          onChange={(e) => setNewAttendee({ ...newAttendee, name: e.target.value })}
        />
        <select
          value={newAttendee.eventName}
          onChange={(e) => setNewAttendee({ ...newAttendee, eventName: e.target.value })}
        >
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event.name}>
              {event.name}
            </option>
          ))}
        </select>
        <select
          value={newAttendee.taskName}
          onChange={(e) => setNewAttendee({ ...newAttendee, taskName: e.target.value })}
        >
          <option value="">Select Task</option>
          {tasks.map((task) => (
            <option key={task._id} value={task.name}>
              {task.name}
            </option>
          ))}
        </select>
        <button onClick={addAttendee}>
          <FaUserPlus /> Add Attendee
        </button>
      </div>

      {/* Attendees List */}
      <div className="attendee-list">
        <h2>Attendees List</h2>
        <table>
          <thead>
            <tr>
              <th className="name-column">Name</th>
              <th className="event-column">Event</th>
              <th className="task-column">Task</th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendees.map((attendee) => (
              <tr key={attendee._id}>
                <td className="name-column">{attendee.name}</td>
                <td className="event-column">{attendee.eventName || "No Event"}</td>
                <td className="task-column">{attendee.taskName || "No Task"}</td>
                <td className="actions-column">
                  <button className="delete-button" onClick={() => deleteAttendee(attendee.name)}>
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
};

export default Attendees;