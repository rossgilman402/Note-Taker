//IMPORT
const express = require("express");
const path = require("path");

//DATA
const PORT = 3000;

const app = express();

//MIDDLEWEAR

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

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
