const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api', require('./Router/Inventory.router'));
app.use('/api', require('./Router/Admin.router'));
app.use('/api/locations', require('./Router/Location.router'));
app.use('/api/directcust', require('./Router/Directcust.router'));
app.use('/api/direct', require('./Router/Direct.router'));
app.use('/api/tracking', require('./Router/Tracking.router'));
app.use('/api', require('./Router/Banner.router'));
app.use('/api', require('./Router/Promocode.router'));
app.use('/api/send-wholesale-enquiry', require('./Router/sendWholesaleEnquiry'));
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack || err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
