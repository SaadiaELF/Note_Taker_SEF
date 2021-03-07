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
// Displays the home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/index.html')));

// Displays the notes pages
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/notes.html')));

// Displays styles
app.get('/assets/css/styles.css', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/assets/css/styles.css')));

// Displays the scripts
app.get('/assets/js/index.js', (req, res) => res.sendFile(path.join(__dirname, 'Develop/public/assets/js/index.js')));

// Displays api database
app.get('/api/notes', (req, res) => {
  res.json(json);
});

// Posting new notes into the database JSON file 
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  // generating specific id by shortid npm package
  newNote.id = shortid.generate();
  // pushing the new note into the json array
  json.push(newNote);
  
  //write the updated data to db.json and display the updated note
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(json));
  res.json(json);
});

// delete note from the database JSON file 
app.delete('/api/notes/:id', function (req, res) {
  const noteId = (req.params.id).toString();
// function to return all notes except the note that we want to delete 
  json = json.filter(CurrentNote => {
    return CurrentNote.id != noteId;
  })

  //write the updated data to db.json and display the updated note
  fs.writeFileSync("./Develop/db/db.json", JSON.stringify(json));
  res.send(`Deleting note with id ${noteId}`);
});

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));