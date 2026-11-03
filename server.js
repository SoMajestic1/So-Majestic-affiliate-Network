const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory storage for tracking affiliate conversions and events (can be swapped for a database later)
const affiliateEvents = [];

// Basic health check endpoint
app.get('/', (req, res) => {
  res.status(200).send('So Majestic Affiliate Network Server is running.');
});

// Webhook endpoint to handle incoming affiliate and payment events
app.post('/api/webhook', (req, res) => {
  const eventData = req.body;
  
  // Log and store the event
  console.log('Received webhook data:', eventData);
  affiliateEvents.push({
    timestamp: new Date(),
    data: eventData
  });

  // Respond back to confirm receipt to the payment/affiliate platform
  res.status(200).json({ 
    status: 'success', 
    message: 'Affiliate event captured successfully',
    received: eventData 
  });
});

// Endpoint to view recorded affiliate events (admin/verification route)
app.get('/api/events', (req, res) => {
  res.status(200).json({
    totalEvents: affiliateEvents.length,
    events: affiliateEvents
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
