# Secure Auth System — Frontend

React client for the Secure Auth System. Handles login, registration, and a protected dashboard using JWT.

Part of a full-stack project — see the [Node.js backend](https://github.com/rrobertf/secure-auth-system).

---

## Stack

- **React 19**
- **Axios** for API requests
- JWT stored in `localStorage`

## Setup

```bash
npm install
npm start
```

App runs on `http://localhost:3000`

Make sure the backend is running first:

```bash
cd ../secure-auth-system
npm run dev
```

## Structure

```
src/
  components/
    Login.js      — login form
    Register.js   — registration form
    Dashboard.js  — protected user dashboard
  App.js          — auth state, routing, API calls
```

## Auth Flow

1. User registers or logs in → backend returns JWT
2. Token stored in `localStorage`
3. On load, token is verified against `/api/auth/me`
4. Dashboard renders if token is valid, redirects to login if not

## Author

**Roberto Feliciano** · CS Student · UIPR Ponce  
[github.com/rrobertf](https://github.com/rrobertf)
