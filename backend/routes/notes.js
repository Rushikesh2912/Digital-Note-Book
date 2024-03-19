const express = require('express');
const fetchuser = require('../middlware/fetchuser');
const router = express.Router();
const Note = require('../models/Note');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Route 1 : create a users data to GET - "api/notes"  login requried
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
});


// Route 2 : create a users data to POST - "api/notes/addnote"  login requried
router.post('/addnote', fetchuser, [
    body('title', 'Enter the Your Title').exists().isLength({ min: 3 }),
    body('description', 'Enter the Your Description must be 5 letter').exists().isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        //if they are an error to return bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Create a new note with the user ID included
        const note = new Note({
            title,
            description,
            tag,
            user: req.user.id // Assuming the user ID is stored in req.user.id
        })
        const saveNote = await note.save();
        res.json(saveNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
});

// Route 3 : update an existing notes data to PUT - "api/notes/updatenote"  login requried
router.patch('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //Create a new note Object
        const newNote = {};

        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //find a note updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        // Check if user is authorized to update the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
});

// Route 4 : Delete an existing notes data to DELETE - "api/notes/deletenote"  login requried
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find a note for delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }
        // Check if user is authorized to delete the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        //Delete note
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully", note: note });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
});
module.exports = router;