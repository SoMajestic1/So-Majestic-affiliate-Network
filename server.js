const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Basic health check endpoint
app.get('/', (req, res) => {
  res.status(200).send('So Majestic Affiliate Network Server is running.');
});

// Webhook / Endpoint placeholder for handling transactions or events
app.post('/api/webhook', (req, res) => {
  const eventData = req.body;
  console.log('Received webhook data:', eventData);
  res.status(200).json({ status: 'success', received: eventData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
