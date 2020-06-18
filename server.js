const express = require('express');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const testimonialsRoutes = require('./routes/testimionials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found...' });
});
  
app.listen(8000, () =>{
  console.log('Server is running on port: 8000');
})