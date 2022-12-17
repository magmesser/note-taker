const api = require("express").Router();
const fs = require("fs");
let db = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

api.get("/notes", (req, res) => {
  db = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

  res.json(db);
});

api.post("/notes", (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4().slice(0, 4),
    };

    db.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(db));

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in posting new note");
  }
});

module.exports = api;
