const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  name: String,
  role: String,
  archetype: String,
  level: Number,
  stats: {
    str: Number,
    dex: Number,
    con: Number,
    int: Number,
    wis: Number,
    cha: Number
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  // ...other fields as needed...
});

module.exports = mongoose.model('Character', characterSchema);