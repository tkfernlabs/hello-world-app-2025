const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Simple logger function
const logToFile = (level, message, error = null) => {
  const timestamp = new Date().toISOString();
  const logMessage = error 
    ? `[${timestamp}] ${level.toUpperCase()}: ${message}\n${error.stack}\n`
    : `[${timestamp}] ${level.toUpperCase()}: ${message}\n`;
  
  const logFile = path.join(logsDir, `app-${new Date().toISOString().split('T')[0]}.log`);
  fs.appendFileSync(logFile, logMessage);
  
  // Also log to console
  console.log(logMessage.trim());
};

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logToFile('info', `${req.method} ${req.path} ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Hello World API is running!' });
});

app.get('/api/hello', (req, res) => {
  res.json({ 
    message: 'Hello, World!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Custom 404 handler - must come after all routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested endpoint ${req.method} ${req.path} does not exist`,
    availableEndpoints: [
      'GET /',
      'GET /api/hello',
      'GET /health'
    ]
  });
});

// Error handler - must come last
app.use((err, req, res, next) => {
  logToFile('error', `Error handling ${req.method} ${req.path}`, err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' 
      ? 'An unexpected error occurred' 
      : err.message
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  logToFile('info', `Server started on http://0.0.0.0:${PORT}`);
  console.log(`Health check: http://0.0.0.0:${PORT}/health`);
  console.log(`Hello endpoint: http://0.0.0.0:${PORT}/api/hello`);
});

// Graceful shutdown handlers
const gracefulShutdown = (signal) => {
  logToFile('info', `${signal} received. Starting graceful shutdown...`);
  
  server.close(() => {
    logToFile('info', 'Server closed. All connections terminated.');
    process.exit(0);
  });
  
  // Force shutdown after 10 seconds
  setTimeout(() => {
    logToFile('error', 'Forcing shutdown after timeout');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Unhandled rejection handler
process.on('unhandledRejection', (reason, promise) => {
  logToFile('error', 'Unhandled Rejection', new Error(reason));
});

// Uncaught exception handler
process.on('uncaughtException', (error) => {
  logToFile('error', 'Uncaught Exception', error);
  gracefulShutdown('UNCAUGHT_EXCEPTION');
});

