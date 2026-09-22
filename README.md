# FINDCAM Web

React + TypeScript + Vite frontend for the FINDCAM AI lost-item detection project.

## Run in VS Code

1. Install Node.js (LTS).
2. Open this folder in VS Code.
3. Open Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the local URL shown by Vite.

This version uses mock data. Later, replace the mock data with Node.js REST API calls.

Suggested API endpoints:
- GET /api/cameras
- GET /api/detections
- GET /api/search?object=keys
- GET /api/statistics
- POST /api/auth/login

Suggested future architecture:
React -> Node.js API -> PostgreSQL
                    -> Python AI / FastAPI
CCTV -> RTSP -> FFmpeg/WebRTC/HLS -> Web UI
