// Dependencies
const express = require('express');
const path = require('path');
const json = require('./db/db.json');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 7080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));

app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'assets/css/styles.css')));

app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, 'assets/js/index.js')));

app.get('/api/notes', (req, res) => {
    res.json(json);
  });

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));