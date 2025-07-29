const Character = require('../models/Character');

exports.getAll = async (req, res) => {
  const chars = await Character.find();
  res.json(chars);
};

exports.getOne = async (req, res) => {
  const char = await Character.findById(req.params.id);
  if (!char) return res.status(404).json({ error: 'Not found' });
  res.json(char);
};

exports.create = async (req, res) => {
  try {
    const character = new Character(req.body);
    await character.save();
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const updated = await Character.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ error: 'Not found' });
  res.json(updated);
};

exports.delete = async (req, res) => {
  const removed = await Character.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
};