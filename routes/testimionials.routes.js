const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('../db');



router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
    const rand = Math.floor(Math.random()*db.length);
    res.json(db.testimonials[rand]);
});

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.filter(item => item.id == req.params.id));
});

router.route('/testimonials').post((req, res) => { 
    const { author, text } = req.body
    const payload = {
        id: uuidv4(),
        author: author,
        text: text, 
    };
    db.testimonials.push(payload);
    res.json({ message: 'Record added' });
});

router.route('/testimonials/:id').delete((req, res) => {
    const position = db.testimonials.findIndex(item => item.id == req.params.id)
    db.testimonials.splice(position, 1);

    res.json({ message: 'Record deleted' });
});

router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;  
    const payload = {
      id: req.params.id, 
      author: author, 
      text: text
    }
  
    const position = db.testimonials.findIndex(item => item.id == req.params.id);
    db.testimonials[position] = payload;  
    res.json({ message: 'Record changed' });
});

module.exports = router 