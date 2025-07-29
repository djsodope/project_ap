const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');
const auth = require('../middleware/auth');

// Protect all character routes
router.get('/', auth, characterController.getAll);
router.get('/:id', auth, characterController.getOne);
router.post('/', auth, characterController.create);
router.put('/:id', auth, characterController.update);
router.delete('/:id', auth, characterController.delete);

module.exports = router;