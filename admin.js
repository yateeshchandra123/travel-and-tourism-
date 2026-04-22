const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db');

function verifyAdmin(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, message: 'No token' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.is_admin) return res.status(403).json({ success: false, message: 'Admin access required' });
    req.admin = decoded;
    next();
  });
}

// Admin Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    const token = jwt.sign({ username, is_admin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

// Get all bookings
router.get('/bookings', verifyAdmin, (req, res) => {
  db.query(
    `SELECT b.*, u.name as user_name, u.email as user_email, d.name as destination_name 
     FROM bookings b JOIN users u ON b.user_id = u.id JOIN destinations d ON b.destination_id = d.id 
     ORDER BY b.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'DB error' });
      res.json({ success: true, data: results });
    }
  );
});

// Get all users
router.get('/users', verifyAdmin, (req, res) => {
  db.query('SELECT id, name, email, phone, created_at FROM users ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'DB error' });
    res.json({ success: true, data: results });
  });
});

// Get stats
router.get('/stats', verifyAdmin, (req, res) => {
  const queries = [
    'SELECT COUNT(*) as total FROM users',
    'SELECT COUNT(*) as total FROM bookings',
    'SELECT COUNT(*) as total FROM destinations',
    'SELECT COALESCE(SUM(total_price), 0) as total FROM bookings WHERE status = "confirmed"'
  ];
  Promise.all(queries.map(q => new Promise((resolve, reject) => {
    db.query(q, (err, r) => err ? reject(err) : resolve(r[0]));
  }))).then(([users, bookings, destinations, revenue]) => {
    res.json({ success: true, data: { users: users.total, bookings: bookings.total, destinations: destinations.total, revenue: revenue.total } });
  }).catch(() => res.status(500).json({ success: false, message: 'Stats error' }));
});

// Update booking status
router.put('/bookings/:id', verifyAdmin, (req, res) => {
  const { status } = req.body;
  db.query('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Update failed' });
    res.json({ success: true, message: 'Status updated' });
  });
});

// Add destination
router.post('/destinations', verifyAdmin, (req, res) => {
  const { name, description, price, image_url, location, duration } = req.body;
  db.query('INSERT INTO destinations (name, description, price, image_url, location, duration) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, image_url, location, duration],
    (err, result) => {
      if (err) return res.status(500).json({ success: false, message: 'Add failed' });
      res.json({ success: true, message: 'Destination added', id: result.insertId });
    }
  );
});

// Delete destination
router.delete('/destinations/:id', verifyAdmin, (req, res) => {
  db.query('DELETE FROM destinations WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Delete failed' });
    res.json({ success: true, message: 'Destination deleted' });
  });
});

module.exports = router;
