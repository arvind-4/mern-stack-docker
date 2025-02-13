# Note-Taking Application

## Overview

This project is an **AI-powered note-taking application** that allows users to create, edit, and enhance their notes using AI capabilities. The application provides a clean and intuitive user interface with interactive features for note management and AI enhancements. The project demonstrates full-stack development skills with a focus on React for the frontend and Node.js for the backend.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Frontend Features](#frontend-features)
3. [Backend Features](#backend-features)
4. [Database Setup](#database-setup)
5. [AI Integration](#ai-integration)
6. [Installation and Setup](#installation-and-setup)
7. [References](#references)
8. [Conclusion](#conclusion)

## Technologies Used

- Frontend:

  - React (with hooks)
  - Redux for state management
  - React Flow (for interactive canvas)

- Backend:
  - Node.js
  - Express.js
  - MongoDB (for storing notes and user data)
- AI Integration:
  - OpenRouter.ai API (for AI-enhanced note features)

## Frontend Features

- **Clean and Responsive UI**: Built using React, the user interface is designed to be intuitive and responsive, ensuring a smooth experience across devices.
- Interactive Canvas: Users can create and drag notes around the canvas, with their positions saved for future sessions.

- Note Creation and Editing: Users can create notes with a title and content, as well as edit them as needed.

- **AI Enhancements**: Each note has an **AI-enhancement button**

- **State Management**: Redux is used for managing the application state, ensuring smooth updates and handling real-time changes across components.

## Backend Features

- CRUD Operations: The backend provides RESTful API endpoints for creating, reading, updating, and deleting notes.

- AI Processing Endpoint: The backend integrates with the AI API (OpenRouter.ai) to process requests for note enhancements like grammar correction, content expansion, and summarization.

## Database Setup

- The database used in this application is **MongoDB**, which stores notes and user data. Each note contains the title, content, timestamp and an id.

## AI Integration

The AI-powered note enhancements are powered by **OpenRouter.ai**.

## Installation and Setup
For Docker setup just run
```bash
docker compose up --build
```

to start frontend, backend and mongo db.

>This set up is for pnpm. If you are using npm replace pnpm with npm to run the commands.

### 1. Clone the repository
### 2. Install dependencies

#### Frontend:

Navigate to the `frontend` directory and install dependencies.

```bash
cd frontend
pnpm install
```

#### Backend:

Navigate to the `backend` directory and install dependencies.

```bash
cd backend
pnpm install
```

### 3. Set up environment variables

Make sure to create `.env` files in both the `frontend` and `backend` directories to store necessary environment variables like API keys, database URL, etc.

### 4. Run the application

#### Frontend:

```bash
pnpm dev
```

#### Backend:

```bash
pnpm dev
```

This will start both the frontend and backend servers, and you can now access the application in your browser.

## References

- OpenRouter for AI functionality
- React Flow for interactive canvas
- Redux for state management

## Conclusion

This AI-powered note-taking application is a showcase of full-stack development, integrating frontend interactivity with backend AI functionality. It allows users to take notes, enhance them using AI, and have a seamless experience.
