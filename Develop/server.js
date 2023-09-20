//IMPORT
const express = require("express");
const path = require("path");
const fs = require("fs");

//DATA
const PORT = 3000;
const app = express();
let notesList = [];

//MIDDLEWEAR

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//FUNCTIONS
function readFile(fileName) {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      notesList = JSON.parse(data);
    }
  });
}

function addAndWriteFile(fileName, newNote) {
  notesList.push(newNote);
  const notesListString = JSON.stringify(notesList);
  fs.writeFile(fileName, notesListString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newNote.noteTitle} has been written to JSON file`);
    }
  });
}

//APP/ API

//ROUTES

//GET Route for homepage
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//GET Route for Notes page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//SERVER START
app.listen(PORT, () => {
  console.log(`App listening to https://localhost:${PORT}`);
});
