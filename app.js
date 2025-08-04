const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

// 🔁 Replace this with your actual n8n webhook URL:
const targetUrl = "http://localhost:5678/webhook/361f40df-458d-4688-bec2-35364dc06d8a/webhook";

app.use(bodyParser.json());

app.post("/", async (req, res) => {
  try {
    await axios.post(targetUrl, req.body);
    res.status(200).send("✅ Webhook forwarded to n8n");
  } catch (error) {
    console.error("❌ Forwarding failed:", error.message);
    res.status(500).send("Error forwarding webhook");
  }
});

app.get("/", (req, res) => {
  res.send("🚀 Webhook forwarder is running!");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

