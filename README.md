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

The frontend is a modern, responsive web application that connects to the backend API.

### Features
- Real-time backend communication
- Connection status indicator
- Modern gradient design
- Responsive layout
- Error handling
- Loading states

### Running the Frontend

```bash
npm run frontend
```

The frontend server runs on port 8080.

### External Access

The frontend is exposed externally at:
**https://frontend-morphvm-hc5yreuu.http.cloud.morph.so**

Visit the URL in your browser to see the application in action!

### Frontend Files
- `public/index.html` - Main HTML page
- `public/styles.css` - CSS styling
- `public/app.js` - JavaScript application logic
- `frontend-server.js` - Express server for static files

## Development

- **Backend**: Node.js v22.21.0 + Express.js v5.1.0
- **Frontend**: HTML5 + CSS3 + Vanilla JavaScript
- **Server**: Express.js for static file serving
- **Database**: Neon (PostgreSQL) - if needed

## Quick Start

### Run Both Servers

```bash
# Terminal 1 - Backend
npm start

# Terminal 2 - Frontend
npm run frontend
```

### Access the Application

- **Frontend**: https://frontend-morphvm-hc5yreuu.http.cloud.morph.so
- **Backend API**: https://backend-morphvm-hc5yreuu.http.cloud.morph.so/api/hello

## Testing

```bash
# Test backend
./test-backend.sh

# Test frontend manually
curl https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/
curl https://backend-morphvm-hc5yreuu.http.cloud.morph.so/api/hello
```

## Documentation

- [Backend Information](BACKEND_INFO.md) - Backend API details
- [Frontend Information](FRONTEND_INFO.md) - Frontend features and usage
- [Status](STATUS.md) - Current project status
- [Issues](ISSUES.md) - Known issues and improvements
- [TODO](TODO.md) - Task tracking

