const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: String,
  role: String,
  archetype: String,
  level: Number,
  stats: {
    STR: Number,
    DEX: Number,
    CON: Number,
    INT: Number,
    WIS: Number,
    CHA: Number
  }
});

module.exports = mongoose.model('Character', characterSchema);