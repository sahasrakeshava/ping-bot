const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Backend URL to ping
const BACKEND_URL =
  process.env.BACKEND_URL || "https://api-kt-bcf1.onrender.com";

// Function to ping the backend using HTTP HEAD for minimal data transfer
const pingBackend = async () => {
  try {
    const response = await axios.head(BACKEND_URL);
    console.log(`Ping successful: ${response.status} - ${response.statusText}`);
  } catch (error) {
    console.error(`Error pinging backend: ${error.message}`);
  }
};

// Set up a CRON job to ping the backend every 14 minutes
cron.schedule("*/14 * * * *", () => {
  console.log("Pinging backend to keep it awake...");
  pingBackend();
});

// Health check route
app.get("/", (req, res) => {
  res.send("Ping bot is running and preventing cold starts.");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Ping bot server is running on port ${PORT}`);
});
