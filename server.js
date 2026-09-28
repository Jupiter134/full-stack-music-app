const express = require('express');
const cors = require('cors');
const db = require('./db'); // connect to database + run model.sql

const app = express();
const PORT = 5000;

//middleware
app.use(cors());
app.use(express.json());

//routes
const artistRoutes = require('./routes/artistRoutes');
app.use('/artists', artistRoutes);

const albumRoutes = require('./routes/albumRoutes');
app.use('/albums', albumRoutes);

const songRoutes = require('./routes/songRoutes');
app.use('/songs', songRoutes);

//test route
app.get('/', (req, res) => {
    res.send("Music API is running");
});

//start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});