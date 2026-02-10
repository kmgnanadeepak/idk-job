# Job Portal Backend Server

This Express server handles Gemini API calls for the Smart College Placement & Job Portal.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure environment:**
   - Open `.env` file
   - Replace `YOUR_API_KEY` with your actual Gemini API key:
     ```
     GEMINI_API_KEY=your_actual_gemini_api_key_here
     ```

3. **Start the server:**
   ```bash
   # For development (with auto-restart)
   npm run dev
   
   # For production
   npm start
   ```

4. **Server endpoints:**
   - `POST /analyze` - Analyze resume with Gemini API
   - `GET /health` - Health check endpoint

5. **Running the full application:**
   ```bash
   # Terminal 1: Start backend server
   cd server
   npm start
   
   # Terminal 2: Start frontend live server
   # Open index.html with live server extension or any static server
   ```

## API Usage

### POST /analyze
**Request:**
```json
{
  "prompt": "Your resume analysis prompt here..."
}
```

**Response:**
```json
{
  "response": "Gemini API response text"
}
```

## Dependencies
- express: Web server framework
- cors: Enable cross-origin requests
- node-fetch: HTTP client for API calls
- dotenv: Environment variable management
