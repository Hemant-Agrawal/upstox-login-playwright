# Upstox Login Automation

A Node.js API server that automates the Upstox login process using Playwright browser automation. This project provides an Express.js endpoint that handles authentication to the Upstox trading platform, including OTP generation and PIN entry.

Repository: [https://github.com/Hemant-Agrawal/upstox-login-playwright](https://github.com/Hemant-Agrawal/upstox-login-playwright)

## Features

- 🔐 Automated Upstox login flow
- 📱 Mobile number-based authentication
- 🔑 OTP generation using time-based one-time passwords (TOTP)
- 🎭 Headless browser automation with Playwright
- 🚀 RESTful API endpoint

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Playwright browsers (will be installed automatically)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Hemant-Agrawal/upstox-login-playwright.git
cd upstox-login-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Usage

1. Start the server:
```bash
node server.js
```

2. The API will be running on `http://localhost:3000`

3. Make a GET request to the root endpoint with the following query parameters:
   - `username`: Upstox mobile number
   - `password`: 6-digit PIN
   - `otpSecret`: Secret key for OTP generation
   - `client_id`: Upstox OAuth client ID
   - `redirect_uri`: OAuth redirect URI

Example:
```
http://localhost:3000/?username=YOUR_MOBILE&password=YOUR_PIN&otpSecret=YOUR_SECRET&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI
```

## API Endpoints

### GET /
Initiates the automated login process for Upstox.

**Query Parameters:**
- `username` (required): Mobile number for login
- `password` (required): 6-digit PIN
- `otpSecret` (required): Secret key for TOTP generation
- `client_id` (required): Upstox OAuth client ID
- `redirect_uri` (required): OAuth redirect URI

**Response:**
- Success: Returns "success" message
- Error: Returns JSON error object with status 400 if required parameters are missing

## Technology Stack

- **Express.js**: Web server framework
- **Playwright**: Browser automation library
- **OTPLib**: Time-based OTP generation

## Project Structure

```
├── server.js          # Main Express server and automation logic
├── package.json       # Project dependencies
├── Dockerfile        # Docker configuration (if applicable)
└── README.md         # Project documentation
```

## Security Notes

⚠️ **Important**: This project handles sensitive authentication credentials. Ensure that:
- The server is not exposed to public networks without proper security measures
- Credentials are never committed to version control
- Use environment variables or secure secret management in production
- Implement proper authentication and authorization for the API endpoint

## License

This project is for personal use. Please ensure compliance with Upstox's terms of service when using this automation.

