# Hello World App

A simple Hello World application with Express.js backend and a frontend.

## GitHub Repository
https://github.com/tkfernlabs/hello-world-app-2025

## Backend

The backend is built with Express.js and provides the following endpoints:

- `GET /` - Root endpoint showing API status
- `GET /api/hello` - Returns a Hello World message with timestamp
- `GET /health` - Health check endpoint

### Running the Backend

```bash
npm install
npm start
```

The server runs on port 3000 by default.

### External Access

The backend is exposed externally at:
**https://backend-morphvm-hc5yreuu.http.cloud.morph.so**

Try it:
- https://backend-morphvm-hc5yreuu.http.cloud.morph.so/api/hello
- https://backend-morphvm-hc5yreuu.http.cloud.morph.so/health

## Frontend

The frontend is a simple HTML/JavaScript application that connects to the backend.

## Development

- Backend: Node.js + Express.js
- Frontend: HTML + JavaScript
- Database: Neon (PostgreSQL) - if needed

