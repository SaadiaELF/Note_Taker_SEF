// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
let json = require('./Develop/db/db.json');
const shortid = require('shortid');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 7080

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/notes.html')));

app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/assets/css/styles.css')));

app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/assets/js/index.js')));

app.get('/api/notes', (req, res) => {
  res.json(json);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = shortid.generate();
  json.push(newNote);
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(json));
});

app.delete('/api/notes/:id', function (req, res) {
  const noteId = (req.params.id).toString();

  json = json.filter(CurrentNote => {
    return CurrentNote.id != noteId;
  })

  //write the updated data to db.json and display the updated note
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(json));
  res.send(`Deleting note with id ${noteId}`)
})

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));