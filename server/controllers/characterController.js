const Character = require('../models/Character');

exports.getAll = async (req, res) => {
  try {
    const characters = await Character.find({ userId: req.userId });
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const character = await Character.findOne({ _id: req.params.id, userId: req.userId });
    if (!character) return res.status(404).json({ error: 'Not found' });
    res.json(character);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const character = new Character({ ...req.body, userId: req.userId });
    await character.save();
    res.status(201).json(character);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const character = await Character.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!character) return res.status(404).json({ error: 'Not found' });
    res.json(character);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const character = await Character.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!character) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};