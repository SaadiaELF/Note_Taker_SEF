// Dependencies
const express = require('express');
const path = require('path');
const json = require('./Develop/db/db.json');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 7080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/index.html')));

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));