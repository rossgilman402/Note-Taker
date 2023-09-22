//IMPORT
const express = require("express");
const path = require("path");
const fs = require("fs");

//DATA
const PORT = process.argv.PORT || 3000;
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

function writeFile(fileName) {
  const notesListString = JSON.stringify(notesList, null, "\t");
  fs.writeFile(fileName, notesListString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${newNote.title} has been written to JSON file`);
    }
  });
}

function addAndWriteFile(fileName, newNote) {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      notesList = JSON.parse(data);
      notesList.push(newNote);
      writeFile("./db/db.json");
    }
  });
}

//APP/ API

//ROUTES

// GET Route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//GET Route for Notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//GET Route /api/notes to return all notes from JSON file
app.get("/api/notes", (req, res) => {
  //Read the file to update the current note list
  readFile("./db/db.json");
  res.json(notesList);
});

//POST Route /api/notes recieve new note and save
app.post("/api/notes", (req, res) => {
  //Get the new note within the body request
  const { title, text } = req.body;

  //check if the title and text is within the body and continue
  if (title && text) {
    const newNote = {
      title,
      text,
    };
    //Add to the list and rewrite to the file
    addAndWriteFile("./db/db.json", newNote);

    //Create a response to send to front end
    const response = {
      status: "Success",
      body: newNote,
    };
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

//DELETE
// app.delete("/api/notes/:id", (req, res) => {
//   const id = req.params.id.toLowerCase();
// });

//SERVER START
app.listen(PORT, () => {
  console.log(`App listening to http://localhost:${PORT}`);
});
