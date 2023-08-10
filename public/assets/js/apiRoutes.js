const fs = require('fs');
const path = require('path');
const uuid = require('uuid'); // Import the uuid package for generating unique IDs
const express = require('express');
const router = express.Router();

// Route to get all notes
router.get('/notes', (req, res) => {
  // Read the contents of the db.json file
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json')));

  // Send the notes data as a JSON response
  res.json(notesData);
});

// Route to create a new note
router.post('/notes', (req, res) => {
  // Extract the new note data from the request body
  const newNote = req.body;

  // Generate a unique ID for the new note
  newNote.id = uuid.v4();

  // Read the current notes from db.json
  const notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json')));

  // Add the new note to the notes array
  notesData.push(newNote);

  // Write the updated notes array back to db.json
  fs.writeFileSync(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notesData));

  // Send the newly created note as a JSON response
  res.json(newNote);
});

// Route to delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;

  // Read the current notes from db.json
  let notesData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json')));

  // Filter out the note with the specified ID
  notesData = notesData.filter(note => note.id !== noteId);

  // Write the updated notes array back to db.json
  fs.writeFileSync(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(notesData));

  // Send a success response
  res.status(200).send('Note deleted successfully');
});

module.exports = router;
