# Frontend Information

## Frontend URL
**Public URL:** https://frontend-morphvm-hc5yreuu.http.cloud.morph.so

## Technology Stack
- **HTML5** - Structure and content
- **CSS3** - Styling with modern gradients and animations
- **Vanilla JavaScript** - API interaction and DOM manipulation
- **Express.js** - Static file server (port 8080)

## Features

### 1. Real-time Backend Communication
- Fetches data from backend API on page load
- Displays "Hello, World!" message with timestamp
- Shows API version information
- Manual refresh button for testing

### 2. Connection Status Indicator
- Visual status dot (green for connected, red for error)
- Real-time connection status text
- Health check integration

### 3. Responsive Design
- Mobile-friendly layout
- Modern gradient design
- Smooth animations and transitions
- Loading spinner during API calls

### 4. Error Handling
- Displays errors gracefully
- CORS-enabled requests
- Network error handling

## File Structure

```
public/
├── index.html      # Main HTML file
├── styles.css      # CSS styling
└── app.js          # JavaScript application logic
```

## API Integration

The frontend connects to the backend API at:
- **Backend URL:** https://backend-morphvm-hc5yreuu.http.cloud.morph.so
- **API Endpoint:** `/api/hello`
- **Health Check:** `/health`

## How to Access

Simply visit: https://frontend-morphvm-hc5yreuu.http.cloud.morph.so

You should see:
1. A welcoming header with gradient background
2. Connection status indicator (should show green when connected)
3. "Hello, World!" message with timestamp from backend
4. Version information
5. API information card
6. Refresh button to manually fetch new data

## Testing the Frontend

### Browser Test
1. Open https://frontend-morphvm-hc5yreuu.http.cloud.morph.so in a web browser
2. Check that the page loads correctly
3. Verify that the backend connection status shows as "Connected" (green dot)
4. Confirm that the "Hello, World!" message is displayed
5. Click the refresh button to fetch a new timestamp

### Command Line Test
```bash
# Test HTML
curl -s https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/ | head -20

# Test CSS
curl -s https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/styles.css | head -10

# Test JavaScript
curl -s https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/app.js | head -10

# Test health endpoint
curl -s https://frontend-morphvm-hc5yreuu.http.cloud.morph.so/health
```

## Developer Features

### Keyboard Shortcuts
- Press `R` to refresh the message from backend

### Auto-refresh (Disabled by default)
Uncomment the `startAutoRefresh()` call in `app.js` to enable automatic refresh every 30 seconds.

### Console Logging
All API calls and responses are logged to the browser console for debugging.

## Server Details
- **Port:** 8080
- **Process:** Running via npm script `npm run frontend`
- **Server File:** `frontend-server.js`

