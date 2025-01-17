# Event Management Dashboard Overview

# Description
The Event Management Dashboard is a web-based application designed to help organizations efficiently manage events, attendees, and tasks. It provides a centralized platform for creating, updating, and tracking events, assigning tasks to attendees, and visualizing task progress. The application features a React-based frontend and a Node.js + Express backend, with MongoDB for data storage.

# Functionalities
(Authentication:  login/logout functionality.)

1. Event Management : Create, Read, Update, Delete (CRUD) operations for events.

2. Attendee Management : Add, view, and delete attendees. Assign attendees to specific events or tasks.

3. Task Management : Create tasks for events. Update task status (Pending/Completed). Track tasks with progress visualization.


# Tech stack
-------------
# Frontend
1. React.js : A JavaScript library for building user interfaces.
2. React Router DOM: For handling routing in the React application.
3. Axios: For making HTTP requests to the backend API.
4. HTML/CSS: For structuring and styling the application.
5. JavaScript : For implementing frontend logic.

# Backend
1. Node.js: A JavaScript runtime for building the backend server.
2. Express.js: A web framework for Node.js to create RESTful APIs.
3. MongoDB: A NoSQL database for storing event, attendee, and task data.
4. Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
5. JWT (JSON Web Tokens): For authentication and securing API endpoints.
6. dotenv: For managing environment variables.

# APIs
1. RESTful APIs: For communication between the frontend and backend.
2. Axios: Used in the frontend to interact with the backend APIs.

# Authentication
1. JWT (JSON Web Tokens): For user authentication and authorization.

# Dev Tools
1. VS Code: Code editor for development.
2. Postman: For testing backend APIs.
3. Git/GitHub: For version control and collaboration.
4. NPM: For package management.

----------------------------------------------------------------------------

# Project Setup:
----------------
# Frontend Setup

1. Navigate to the frontend directory: cd frontend 

2. Install dependencies : npm install  

3. Install additional packages: npm i react-router-dom axios  

4. Start the development server : npm start  


# Backend Setup

1. Navigate to the backend directory : cd backend  

2. Install dependencies : npm install 

3. Start the backend server : npm start 



# API Documentation

# Event Management API

1. Create an Event

Endpoint: /postEvent

Method: POST

Body Parameters:
name (string): Event name.
description (string): Event description.
location (string): Event location.
date (string): Event date.

2. Get All Events

Endpoint: /getEvents

Method: GET

3. Update an Event

Endpoint: /updateEvent

Method: PUT

Body Parameters:
name (string): Event name.
description (string): Updated description.
location (string): Updated location.
date (string): Updated date.

4. Delete an Event

Endpoint: /deleteEvent

Method: DELETE

Body Parameters:
eventName (string): Name of the event to delete.

# Attendee Management API

1. Add an Attendee

Endpoint: /postAttendee

Method: POST

Body Parameters:
name (string): Attendee name.
email (string): Attendee email.
event (string): Event ID.

2. Get All Attendees

Endpoint: /getAttendees

Method: GET

3. Delete an Attendee

Endpoint: /deleteAttendee

Method: DELETE

Body Parameters:
attendeeName (string): Name of the attendee to delete.

# Task Management API
1. Create a Task

Endpoint: /postTask

Method: POST

Body Parameters:
name (string): Task name.
event (string): Event ID.
status (string): Task status (Pending/Completed).

2. Get Tasks for an Event

Endpoint: /getEventTasks
Method: GET
Query Parameters:
name (string): Event name.

3. Update Task Status

Endpoint: /changeTaskStatus

Method: PUT

Body Parameters:
taskName (string): Task name.
status (string): Updated status (Pending/Completed).


# Bonus Features Included

Authentication:  login/logout functionality.

Progress Visualization: progress bar to show task completion.

Calendar View:  events in a calendar format.
