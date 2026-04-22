const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all destinations
router.get('/', (req, res) => {
  db.query('SELECT * FROM destinations ORDER BY id', (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'DB error' });
    res.json({ success: true, data: results });
  });
});

// GET single destination
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM destinations WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'DB error' });
    if (results.length === 0) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: results[0] });
  });
});

module.exports = router;
