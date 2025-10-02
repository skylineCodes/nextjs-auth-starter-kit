
# 🔐 Auth Kit Frontend (Next.js + Tailwind)

A production-ready **frontend integration for authentication flows**.
Built with **Next.js, TailwindCSS, and ShadCN UI,** it demonstrates secure practices like JWT sessions, refresh tokens, device management, and anomaly detection — the features you’d expect in a modern SaaS platform.

## 🚀 Features

### 🔑 Sign Up Page
- Email, username, password input  
- Auto-login or redirect to Sign In  

### 🔓 Sign In Page
- Standard login form with error handling (wrong credentials, locked account, etc.)  

### 🛡️ Session + JWT Auth
- Secure token storage (httpOnly cookie or memory + refresh token flow)  
- Protected routes (e.g. `/dashboard`)  

### 👀 Login Tracking + Anomaly Detection
- “Recent Login Activity” dashboard (device, IP, location)  
- Simulated anomaly alerts  

### 💻 Multi-Device Session Management
- “Manage Devices” page  
- List active sessions with revoke option  

### 🔄 Forgot Password Flow
- Request reset via email  
- Secure token reset → update password  

### ♻️ Refresh Token Strategy
- Silent refresh behind the scenes  
- Keeps user logged in even when tokens expire  

---

## 🛡️ Session + JWT Auth

![Session and JWT Auth Screenshot](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Fjwt-auth-header.png?alt=media&token=e5130004-2685-4b5b-96f5-076336150297)

![](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Fsession-cookie.png?alt=media&token=ec940a46-78b2-485b-90ee-ea5d5fa2d8ba)

Authentication is powered by **JWTs (JSON Web Tokens)** and a **refresh token strategy** to ensure both security and usability.

### 🔍 How It Works
- **Secure Token Storage** → Access tokens are stored in **httpOnly cookies** to prevent XSS leaks.  
- **Refresh Tokens** → A background refresh flow silently re-issues new access tokens before expiry, keeping users logged in seamlessly.  
- **Protected Routes** → Pages like `/dashboard` are gated behind authentication middleware. If a user is not logged in, they are redirected to the Sign In page.  

### ⚙️ Implementation Details
- **Next.js Middleware** is used to check authentication status on protected routes.  
- **API proxy routes** (e.g., `/api/auth/*`) handle secure token forwarding to the backend.  
- **Auto-refresh logic** is implemented using interceptors (e.g., Axios or fetch wrapper) to retry failed requests when a token is expired.  
- **Logout** clears both access and refresh tokens across all devices.  

---

## 👀 Login Tracking + Anomaly Detection

![Recent Login Activity Screenshot](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Frecent-logins.png?alt=media&token=e9528db7-0e2a-488b-9046-2f24c3241f41)

Modern apps don’t just authenticate — they **track login behavior** to spot unusual activity and keep accounts safe.  
This module demonstrates how recent logins can be surfaced to the user and how anomalies can be flagged.

### 🔍 How It Works
- **Recent Login Activity** → Displays a list of the most recent login attempts, including:
  - Device type (desktop, mobile, browser)  
  - IP address  
  - Geo-location (simulated for demo purposes)  
  - Timestamp of login  
- **Anomaly Detection** → Simulated logic flags:
  - Logins from unfamiliar devices  
  - Logins from suspicious IP ranges  
  - Multiple failed login attempts in a short period  

### ⚙️ Implementation Details
- **Backend** → Each login request is logged with metadata (IP, device, timestamp).  
- **Frontend Dashboard** → Data is pulled into a “Recent Logins” table for visibility.  
- **Anomaly Alerts** → UI highlights suspicious logins (e.g., “⚠️ Login from new device”).  
- **Extensible** → Could integrate with services like MaxMind GeoIP or custom ML models for production anomaly detection.  

---

## 💻 Multi-Device Session Management

![Manage Devices Screenshot](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Fmanage-device.png?alt=media&token=d522aad7-823a-424a-854f-59750c0dc273)

In real-world apps, users often log in across multiple devices — desktop, mobile, and tablets.  
This feature allows users to **see all active sessions** tied to their account and **take control** by revoking access when needed.

### 🔍 How It Works
- **Manage Devices Page** → Central hub for monitoring all active sessions.  
- **Active Session List** → Shows:
  - Device/browser type  
  - IP address  
  - Last active timestamp  
- **Revoke Access** → Each session row has a “Revoke” button, allowing users to log out devices remotely.  

### ⚙️ Implementation Details
- **Session Metadata** → Stored in the backend during login (device, IP, issuedAt).  
- **API Endpoint** → `/sessions` endpoint returns all active sessions for the logged-in user.  
- **Frontend Integration** → Next.js page renders the sessions in a table, with revoke actions per session.  
- **Revoke Flow** → Calling the revoke endpoint invalidates the refresh token for that device, forcing re-authentication.  
- **Security UX** → Useful after password changes, or if an anomaly is detected in the login activity panel.  

---

## 🔄 Forgot Password Flow

![Forgot Password Screenshot](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Fforgot-password.png?alt=media&token=196d28a5-2f1d-426d-a038-18e8c5a5a870)

![](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Freset-password.png?alt=media&token=0559cde2-1d25-4e7f-96c5-1a583847d00e)

![](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Ftoo-many-attempt.png?alt=media&token=eec8b281-db55-4bc3-8104-32c4baba75ec)

Password recovery is a **core feature** of any authentication system.  
This flow ensures users can safely reset their credentials without compromising security.

### 🔍 How It Works
- **Request Reset** → User enters their email on the “Forgot Password” page.  
- **Email Delivery** → Backend sends a one-time reset token (simulated in this demo).  
- **OTP Code** → User receives an OTP code in their email.
- **Password Update** → If the token is valid, the password is securely updated.  
- **Rate Limiting** → Each email can only request **5 reset tokens per hour**.  
  - After 5 attempts, the user must wait 1 hour before requesting again.  
  - Helps prevent abuse and spam attacks.  

### ⚙️ Implementation Details
- **Reset Tokens** → Time-limited, single-use tokens generated and stored by the backend.  
- **Request Window** → A counter is tracked per email; requests beyond 5 in an hour are blocked.  
- **Frontend Flow** → Two-step process:
  1. Submit email → request reset  
  2. Enter new password → verify token + update  
- **Validation** → Includes checks for token expiry, password strength, and rate-limiting feedback.  
- **User Experience** → Friendly feedback messages (“Check your email”, “Password updated successfully”, or “Too many attempts, try again in 1 hour”).

---

## ♻️ Refresh Token Strategy

![Refresh Token Flow Screenshot](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Frefresh-token.png?alt=media&token=9855ceff-0651-431f-9f60-68e88c4d0d9a)

To provide a seamless experience, this project implements a **refresh token strategy**.  
It ensures users stay logged in without frequent interruptions while still maintaining strong security practices.

### 🔍 How It Works
- **Silent Refresh** → When an access token expires, the frontend automatically requests a new one using a refresh token.  
- **Behind the Scenes** → This process happens in the background, so the user does not notice any disruption.  
- **Session Continuity** → Users remain authenticated as long as their refresh token is valid.  
- **Auto Logout** → If the refresh token is expired or revoked, the user is logged out and redirected to Sign In.  

### ⚙️ Implementation Details
- **Access Token Lifetime** → Short-lived (e.g., 15 minutes) for security.  
- **Refresh Token Lifetime** → Longer-lived (e.g., 7 days) and tied to a specific device/session.  
- **Interceptor Logic** → A fetch interceptor catches `401 Unauthorized` responses, attempts a silent refresh, and retries the original request.  
- **Security Considerations** →  
  - Refresh tokens stored securely (httpOnly cookies).  
  - Invalidated immediately if the session is revoked (via Manage Devices).  
  - Protects against replay attacks by rotating refresh tokens on each use.  

---

## 🔁 API Proxy Routes

![API Proxy Routes Screenshot](https://firebasestorage.googleapis.com/v0/b/mizright-3949d.appspot.com/o/images%2Fapi-proxy.png?alt=media&token=d82771c2-dab7-4593-8691-81313efa6089)

Instead of calling the backend API directly from the frontend, all authentication-related requests are routed through **Next.js API routes**.  
This adds an extra layer of security and flexibility when handling sensitive operations.

### 🔍 How It Works
- **Proxy Authentication Calls** → Sign In, Sign Up, Refresh, and Logout requests are forwarded via `/api/auth/*` endpoints in Next.js.  
- **Hidden Backend URL** → The frontend never exposes the actual backend Auth Kit URL, keeping infrastructure details private.  
- **Unified Error Handling** → Errors from the backend are normalized in the proxy before reaching the frontend.  

### ⚙️ Implementation Details
- **Next.js API Routes** → Act as a middle layer between frontend and backend.  
- **Cookie Handling** → Tokens (httpOnly cookies) are set and cleared at the proxy layer.  
- **Extensibility** → Developers can easily plug in:
  - Request logging  
  - Caching strategies  
  - Middleware (e.g., rate limiting, audit logs)  

---

## ⚡ Next.js Middleware for Route Protection

Protecting sensitive pages is a critical part of any authentication system.  
This project uses **Next.js Middleware** to enforce route-level security, ensuring only authenticated users can access restricted areas.

### 🔍 How It Works
- **Middleware Interception** → Runs before every request to protected routes (e.g., `/dashboard`).  
- **Auth Check** → Verifies the presence and validity of the user’s session.  
- **Redirection** → Unauthenticated users are redirected to the Sign In page automatically.  
- **Seamless Experience** → Authenticated users proceed to the requested page without delay.  

### ⚙️ Implementation Details
- **`middleware.ts`** → Defines logic for matching protected routes and validating tokens.  
- **Pattern Matching** → Applies protection selectively (e.g., `/dashboard/*` but not `/auth/*`).  
- **Token Verification** → Uses the access token or session cookie provided by the Auth Kit backend.  
- **Customizable** → Developers can extend logic for role-based access (e.g., admin vs. user).  

---

## ⚡️ Tech Stack

This project is built with a modern, production-ready stack optimized for both **developer experience** and **security**:

- **[Next.js](https://nextjs.org/)** — React-based frontend framework with SSR and API routes  
- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first CSS framework for rapid styling  
- **[ShadCN/UI](https://ui.shadcn.com/)** — Accessible, customizable component library  
- **[Auth Kit API (NestJS)](https://github.com/skylineCodes/nestjs-auth-starter-kit)** — Backend authentication API providing session, JWT, and device management  

---

## 🛠️ Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repo
```
git clone https://github.com/your-username/auth-kit-frontend.git
cd auth-kit-frontend
```

### 2. Install dependencies
```
npm install
```

### 3. Setup environment variables
- Copy .env.example → .env
- Update API URL (Auth Kit backend):
```
BACKEND_URL='http://localhost'
```

### 4. Run dev server
```
npm run dev
```

### 5. Open in browser

Visit: http://localhost:3000

---

## 📌 Roadmap

Planned features and upcoming improvements:

- **Social Login** → Google, GitHub integration  
- **Two-Factor Authentication (2FA)** → TOTP apps & Email OTP

---

## 🤝 Contributing  

Contributions are always welcome! 🚀  
- Open an issue for ideas, bugs, or feature requests  
- Submit a PR with improvements or fixes  

---

## 📜 License  

This project is licensed under the **MIT License**.  
You’re free to use, modify, and distribute with attribution.  
