# Liora Store — web

This folder contains the web frontend for Liora Store (React + Vite + TypeScript + Tailwind).

Quick start:

1. cd web
2. npm install
3. create a file named `.env` with the following variables:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

4. npm run dev

Notes:
- This is an initial scaffold implementing the core pages and Firebase initialization.
- Next steps: implement full search UX, cart persistence, checkout flows, admin tools, and support chat.
