// Configuration - Environment-based backend URL
// Try to get backend URL from meta tag, fallback to hardcoded value
const getBackendURL = () => {
    const metaTag = document.querySelector('meta[name="backend-url"]');
    if (metaTag) {
        return metaTag.getAttribute('content');
    }
    // Fallback for production
    return 'https://backend-morphvm-hc5yreuu.http.cloud.morph.so';
};

const BACKEND_URL = getBackendURL();
const API_ENDPOINT = '/api/hello';

// State
let requestCount = 0;
let isLoading = false;

// DOM Elements
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');
const loadingDiv = document.getElementById('loading');
const messageContent = document.getElementById('message-content');
const errorContent = document.getElementById('error-content');
const messageText = document.getElementById('message-text');
const timestamp = document.getElementById('timestamp');
const version = document.getElementById('version');
const errorText = document.getElementById('error-text');
const refreshBtn = document.getElementById('refresh-btn');
const requestCountSpan = document.getElementById('request-count');

// Utility Functions
function updateConnectionStatus(isConnected, message) {
    if (isConnected) {
        statusDot.classList.add('connected');
        statusDot.classList.remove('error');
        statusText.textContent = message || 'Connected to backend';
        statusText.style.color = '#2f855a';
    } else {
        statusDot.classList.add('error');
        statusDot.classList.remove('connected');
        statusText.textContent = message || 'Connection failed';
        statusText.style.color = '#c53030';
    }
}

function showLoading() {
    loadingDiv.style.display = 'block';
    messageContent.style.display = 'none';
    errorContent.style.display = 'none';
}

function showMessage(data) {
    loadingDiv.style.display = 'none';
    messageContent.style.display = 'block';
    errorContent.style.display = 'none';

    messageText.textContent = data.message;
    
    if (data.timestamp) {
        const date = new Date(data.timestamp);
        timestamp.textContent = `Timestamp: ${date.toLocaleString()}`;
    }
    
    if (data.version) {
        version.textContent = `Version: ${data.version}`;
    }
}

function showError(error) {
    loadingDiv.style.display = 'none';
    messageContent.style.display = 'none';
    errorContent.style.display = 'block';

    errorText.textContent = `Error: ${error}`;
}

function updateRequestCount() {
    requestCount++;
    requestCountSpan.textContent = requestCount;
}

// API Functions
async function fetchHelloMessage() {
    if (isLoading) {
        console.log('Request already in progress');
        return;
    }

    try {
        isLoading = true;
        refreshBtn.disabled = true;
        showLoading();

        console.log(`Fetching from: ${BACKEND_URL}${API_ENDPOINT}`);
        
        const response = await fetch(`${BACKEND_URL}${API_ENDPOINT}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            mode: 'cors',
        });

        console.log('Response status:', response.status);
        updateRequestCount();

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);

        showMessage(data);
        updateConnectionStatus(true, 'Connected to backend ✓');

    } catch (error) {
        console.error('Fetch error:', error);
        showError(error.message);
        updateConnectionStatus(false, 'Connection failed ✗');
    } finally {
        isLoading = false;
        refreshBtn.disabled = false;
    }
}

async function checkBackendHealth() {
    try {
        console.log('Checking backend health...');
        const response = await fetch(`${BACKEND_URL}/health`, {
            method: 'GET',
            mode: 'cors',
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Health check:', data);
            updateConnectionStatus(true, 'Backend is healthy ✓');
            return true;
        } else {
            throw new Error(`Health check failed: ${response.status}`);
        }
    } catch (error) {
        console.error('Health check error:', error);
        updateConnectionStatus(false, 'Backend unreachable ✗');
        return false;
    }
}

// Event Listeners
refreshBtn.addEventListener('click', () => {
    console.log('Refresh button clicked');
    fetchHelloMessage();
});

// Keyboard shortcut: Press 'R' to refresh
document.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            fetchHelloMessage();
        }
    }
});

// Initialize
async function init() {
    console.log('Initializing frontend...');
    console.log('Backend URL:', BACKEND_URL);
    
    // First check if backend is healthy
    const isHealthy = await checkBackendHealth();
    
    if (isHealthy) {
        // If healthy, fetch the hello message
        await fetchHelloMessage();
    } else {
        // If not healthy, show error but still try to fetch
        showError('Backend health check failed. Attempting to fetch message anyway...');
        setTimeout(() => fetchHelloMessage(), 1000);
    }
}

// Auto-refresh every 30 seconds (optional)
const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds
let autoRefreshTimer;

function startAutoRefresh() {
    autoRefreshTimer = setInterval(() => {
        console.log('Auto-refreshing...');
        fetchHelloMessage();
    }, AUTO_REFRESH_INTERVAL);
}

function stopAutoRefresh() {
    if (autoRefreshTimer) {
        clearInterval(autoRefreshTimer);
    }
}

// Uncomment to enable auto-refresh
// startAutoRefresh();

// Start the application
init();

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        console.log('Page visible again, checking connection...');
        checkBackendHealth();
    }
});

// Log startup
console.log('Hello World Frontend v1.0.0');
console.log('Ready to connect to backend!');

// Global error boundary - catch all unhandled errors
window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    
    // Log to backend (if available) or show user-friendly message
    const errorMessage = `Unexpected error: ${event.error?.message || 'Unknown error'}`;
    
    // Try to show error in UI if elements are available
    if (errorContent && errorText) {
        showError(errorMessage);
        updateConnectionStatus(false, 'Application error occurred');
    } else {
        // Fallback to alert if UI not ready
        alert(`Application Error: ${errorMessage}\n\nPlease refresh the page.`);
    }
    
    // Prevent default error handling
    event.preventDefault();
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    
    const errorMessage = `Unhandled error: ${event.reason?.message || event.reason || 'Unknown promise rejection'}`;
    
    if (errorContent && errorText) {
        showError(errorMessage);
        updateConnectionStatus(false, 'Promise rejection occurred');
    }
    
    // Prevent default handling
    event.preventDefault();
});

