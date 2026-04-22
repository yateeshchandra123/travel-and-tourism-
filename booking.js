const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}

// Create booking
router.post('/', verifyToken, (req, res) => {
  const { destination_id, travel_date, num_persons, total_price } = req.body;
  const user_id = req.user.id;
  if (!destination_id || !travel_date || !num_persons) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }
  db.query(
    'INSERT INTO bookings (user_id, destination_id, travel_date, num_persons, total_price, status) VALUES (?, ?, ?, ?, ?, "pending")',
    [user_id, destination_id, travel_date, num_persons, total_price],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Booking failed' });
      res.json({ success: true, message: 'Booking confirmed!', booking_id: result.insertId });
    }
  );
});

// Get user bookings
router.get('/my', verifyToken, (req, res) => {
  db.query(
    `SELECT b.*, d.name as destination_name, d.image_url FROM bookings b 
     JOIN destinations d ON b.destination_id = d.id 
     WHERE b.user_id = ? ORDER BY b.created_at DESC`,
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'DB error' });
      res.json({ success: true, data: results });
    }
  );
});

module.exports = router;
