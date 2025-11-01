const express = require("express");
const { chromium } = require("playwright");
const { authenticator } = require("otplib");
const path = require("path");
const fs = require("fs");
const { getToken } = require("./upstox");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const formPath = path.join(__dirname, "views", "form.html");
  const htmlForm = fs.readFileSync(formPath, "utf8");
  res.send(htmlForm);
});

app.post("/upstox", async (req, res) => {
  console.log("Starting login process");
  const {
    username,
    password,
    otpSecret,
    client_id,
    client_secret,
    redirect_uri,
  } = req.body;

  const missingFields = [];
  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (!otpSecret) missingFields.push("otpSecret");
  if (!client_id) missingFields.push("client_id");
  if (!client_secret) missingFields.push("client_secret");
  if (!redirect_uri) missingFields.push("redirect_uri");

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required parameters",
      missing: missingFields,
    });
  }

  let browser;

  const response = {
    success: false,
    url: null,
    error: null,
  };
  try {
    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(
      `https://api.upstox.com/v2/login/authorization/dialog?client_id=${client_id}&redirect_uri=${redirect_uri}`
    );
    await page.locator("#mobileNum").click();
    await page.locator("#mobileNum").fill(username);
    await page.getByRole("button", { name: "Get OTP" }).click();
    const code = authenticator.generate(otpSecret);
    await page.locator("#otpNum").fill(code);
    await page.getByRole("button", { name: "Continue" }).click();
    await page
      .getByRole("textbox", { name: "Enter 6-digit PIN" })
      .fill(password);

    page.on("requestfailed", (request) => {
      const failedUrl = request.url();
      response.url = failedUrl;
      response.success = failedUrl.includes(redirect_uri);
      console.log("Failed request URL:", failedUrl);
    });

    page.on("response", (res) => {
      const status = res.status();
      if (status >= 400) {
        const url = res.url();
        response.url = url;
        response.success = false;
        console.log(`Error response URL (${status}):`, url);
      }
    });
    // Wait for navigation to redirect URI after clicking Continue
    await page.getByRole("button", { name: "Continue" }).click();
    await page.waitForLoadState("networkidle");

    const finalUrl = page.url();
    if (finalUrl.includes(redirect_uri)) {
      response.url = finalUrl;
      response.success = true;
    }
    await page.waitForTimeout(2000);
    console.log("Final URL:", response.url);
    const match = response.url ? response.url.match(/code=([^&]+)/) : null;
    if (match) {
      console.log("Code found:", match[1]);
      const code = match[1];
      response.data = await getToken(
        code,
        client_id,
        client_secret,
        redirect_uri
      );
    }

    await browser.close();

    console.log("Login successful");

    res.json(response);
  } catch (error) {
    console.error("Error during login process:", error);
    response.error = error.message;
    response.success = false;
    res.status(500).json(response);
  }
});

app.listen(PORT, () =>
  console.log(`🚀 API running on http://localhost:${PORT}`)
);
