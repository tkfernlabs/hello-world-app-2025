const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.FRONTEND_PORT || 8080;

// Cache configuration
const ONE_HOUR = 3600;
const ONE_DAY = 86400;
const ONE_WEEK = 604800;

// Custom middleware for cache headers
app.use((req, res, next) => {
    // Set cache headers based on file type
    const ext = path.extname(req.path);
    
    if (ext === '.css' || ext === '.js') {
        // Cache CSS and JS for 1 week with revalidation
        res.setHeader('Cache-Control', `public, max-age=${ONE_WEEK}, must-revalidate`);
    } else if (ext === '.ico' || ext === '.svg' || ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // Cache images for 1 week
        res.setHeader('Cache-Control', `public, max-age=${ONE_WEEK}, immutable`);
    } else if (ext === '.html' || req.path === '/') {
        // Don't cache HTML - always revalidate
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
    
    next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', service: 'frontend' });
});

// Fallback to index.html for any other routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Frontend server running on port ${PORT}`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`Network: http://0.0.0.0:${PORT}`);
    console.log(`Serving files from: ${path.join(__dirname, 'public')}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    process.exit(0);
});

