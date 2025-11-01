# Upstox Login Automation

A Node.js API server that automates the Upstox login process using Playwright browser automation. This project provides a web interface and RESTful API endpoint that handles authentication to the Upstox trading platform, including OTP generation, PIN entry, and token exchange.

Repository: [https://github.com/Hemant-Agrawal/upstox-login-playwright](https://github.com/Hemant-Agrawal/upstox-login-playwright)

## Features

- 🔐 Automated Upstox login flow
- 📱 Mobile number-based authentication
- 🔑 OTP generation using time-based one-time passwords (TOTP)
- 🎭 Headless browser automation with Playwright
- 🚀 RESTful API endpoint
- 🖥️ User-friendly web form interface
- 🔄 Automatic token exchange after authorization

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

3. **Using the Web Form (Recommended):**
   - Open your browser and navigate to `http://localhost:3000`
   - Fill in the form with your credentials:
     - **Username**: Your Upstox mobile number
     - **Password**: Your 6-digit PIN
     - **OTP Secret**: Secret key for TOTP generation
     - **Client ID**: Upstox OAuth client ID
     - **Client Secret**: Upstox OAuth client secret
     - **Redirect URI**: OAuth redirect URI
   - Click Submit

4. **Using the API directly:**
   - Make a POST request to `http://localhost:3000/upstox` with the following JSON body:
   ```json
   {
     "username": "YOUR_MOBILE",
     "password": "YOUR_PIN",
     "otpSecret": "YOUR_SECRET",
     "client_id": "YOUR_CLIENT_ID",
     "client_secret": "YOUR_CLIENT_SECRET",
     "redirect_uri": "YOUR_REDIRECT_URI"
   }
   ```

## API Endpoints

### GET /
Returns an HTML form for easy credential input.

**Response:**
- HTML form with input fields for all required parameters

### POST /upstox
Initiates the automated login process for Upstox.

**Request Body (JSON):**
- `username` (required): Mobile number for login
- `password` (required): 6-digit PIN
- `otpSecret` (required): Secret key for TOTP generation
- `client_id` (required): Upstox OAuth client ID
- `client_secret` (required): Upstox OAuth client secret
- `redirect_uri` (required): OAuth redirect URI

**Response:**
```json
{
  "success": true,
  "url": "https://redirect-uri.com?code=AUTHORIZATION_CODE",
  "data": {
    "access_token": "...",
    "token_type": "Bearer",
    ...
  },
  "error": null
}
```

**Error Response:**
```json
{
  "success": false,
  "url": null,
  "error": "Error message",
  "missing": ["field1", "field2"]  // if validation fails
}
```

## Technology Stack

- **Express.js**: Web server framework
- **Playwright**: Browser automation library
- **OTPLib**: Time-based OTP generation

## Project Structure

```
├── server.js          # Main Express server and automation logic
├── upstox.js          # Upstox token exchange logic
├── views/
│   └── form.html      # Web form interface
├── package.json       # Project dependencies
├── Dockerfile         # Docker configuration (if applicable)
└── README.md          # Project documentation
```

## Security Notes

⚠️ **Important**: This project handles sensitive authentication credentials. Ensure that:
- The server is not exposed to public networks without proper security measures
- Credentials are never committed to version control
- Use environment variables or secure secret management in production
- Implement proper authentication and authorization for the API endpoint
- Consider using HTTPS in production environments

## License

This project is for personal use. Please ensure compliance with Upstox's terms of service when using this automation.

