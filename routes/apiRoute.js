const fs = require("fs");
const express = require("express");
const router = express.Router();
const noteID = require("../helpers/uuid");
const data = require("../db/db.json");

router.get("/api/notes", (req, res) => {
  const read = fs.readFile(data, "utf-8");
  res.json(read);
});

router.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: noteID,
    };

    // Obtain existing notes
    fs.readFile("../db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new note
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          "../db/db.json",
          JSON.stringify(parsedNotes, null, 3),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

module.exports = router;