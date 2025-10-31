const express = require("express");
const { chromium } = require("playwright");
const { authenticator } = require("otplib");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  console.log("Starting login process");
  const { username, password, otpSecret, client_id, redirect_uri } = req.query;
  if (!username || !password || !otpSecret || !client_id || !redirect_uri) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(`https://api.upstox.com/v2/login/authorization/dialog?client_id=${client_id}&redirect_uri=${redirect_uri}`);
  await page.locator('#mobileNum').click();
  await page.locator('#mobileNum').fill(username);
  await page.getByRole('button', { name: 'Get OTP' }).click();
  const code = authenticator.generate(otpSecret);
  await page.locator('#otpNum').fill(code);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('textbox', { name: 'Enter 6-digit PIN' }).fill(password);
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByText('{"message":"Workflow was started"}').click();
  await browser.close();

  res.send("success");
});

app.listen(PORT, () => console.log(`🚀 API running on http://localhost:${PORT}`));
