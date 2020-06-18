const express = require('express');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
    { id: 3, author: 'Adam Goss', text: 'This company is worth every coin!' },
    { id: 4, author: 'Jan Kowalski', text: 'They really know how to make you happy.' },
  ]; */

app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/random', (req, res) => {
    const rand = Math.floor(Math.random()*db.length);
    res.json(db.testimonials[rand]);
});

app.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials.filter(item => item.id == req.params.id));
});

app.post('/testimonials', (req, res) => { 
    const { author, text } = req.body
    const payload = {
        id: uuidv4(),
        author: author,
        text: text, 
    };
    db.testimonials.push(payload);
    res.json({ message: 'Record added' });
});

app.delete('/testimonials/:id', (req, res) => {

    const position = db.testimonials.findIndex(item => item.id == req.params.id)
    db.testimonials.splice(position, 1);

    res.json({ message: 'Record deleted' });
});

app.put('/testimonials/:id', (req, res) => {
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

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});
  
app.listen(8000, () =>{
  console.log('Server is running on port: 8000');
})