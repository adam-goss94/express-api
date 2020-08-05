const Concert = require('../models/concerts.models');

exports.getPerformer = async (req, res) => {
  try {
    res.json(await Concert.findOne({performer: req.params.performer }));
  } catch {
    res.status(500).json({ message: err });
  }
};

exports.getGenre = async (req, res) => {
  try {
    res.json(await Concert.find({genre: req.params.genre}));
  } catch {
    res.status(500).json({ message: err });
  }
}

exports.getPriceMinMax = async (req, res) => {
  try {
    res.json(await Concert.find({ $and: [{ price: { $gte: req.params.price_min } }, { price: { $lte: req.params.price_max } }] }));
  } catch {
    res.status(500).json({ message: err });
  }
}

exports.getDay = async (req, res) => {
  try {
    res.json(await Concert.find({day: req.params.day}));
  } catch {
    res.status(500).json({ message: err });
  }
}