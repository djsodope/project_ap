const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
  name: String,
  level: Number,
  role: String,
  archetype: String,
  background: String,
  race: String,
  ap: Number,
  gp: Number,
  stats: {
    str: Number, dex: Number, con: Number, int: Number, wis: Number, cha: Number
  },
  skills: [Object],
  reaction: String,
  resource: Object,
  passives: [String],
  gear: Object,
  momentum: { type: Number, default: 0 }
});

module.exports = mongoose.model('Character', CharacterSchema);