const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const Character = require('../models/Character');

// TEST ROUTES FIRST!
router.get('/test', async (req, res) => {
  res.json({ status: "ok" });
});

router.get('/test-mongo', async (req, res) => {
  try {
    const chars = await Character.find({});
    res.json(chars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// THEN your CRUD routes
router.get('/', characterController.getAll);
router.get('/:id', characterController.getOne);
router.post('/', characterController.create);
router.put('/:id', characterController.update);
router.delete('/:id', characterController.delete);

module.exports = router;