# Backend Information

## External URL
The backend is exposed at: **https://backend-morphvm-hc5yreuu.http.cloud.morph.so**

## Endpoints

### Root Endpoint
- **URL**: `https://backend-morphvm-hc5yreuu.http.cloud.morph.so/`
- **Method**: GET
- **Description**: Shows API status
- **Response**:
  ```json
  {
    "message": "Hello World API is running!"
  }
  ```

### Hello World Endpoint
- **URL**: `https://backend-morphvm-hc5yreuu.http.cloud.morph.so/api/hello`
- **Method**: GET
- **Description**: Returns a Hello World message with timestamp
- **Response**:
  ```json
  {
    "message": "Hello, World!",
    "timestamp": "2025-10-25T10:05:13.447Z",
    "version": "1.0.0"
  }
  ```

### Health Check Endpoint
- **URL**: `https://backend-morphvm-hc5yreuu.http.cloud.morph.so/health`
- **Method**: GET
- **Description**: Health check endpoint
- **Response**:
  ```json
  {
    "status": "healthy"
  }
  ```

## Local Development
- The server runs locally on port 3000
- Start the server: `npm start`
- Local URL: `http://localhost:3000`

