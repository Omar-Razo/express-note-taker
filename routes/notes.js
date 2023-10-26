const notes = require('express').Router()
const { v4: uuidv4 } = require('uuid')
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


// get all notes route (default)
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

//post NEW note route
notes.post('/', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json')


        res.json(`New note: ${newNote.title} saved successfully!`)
    } else {
        res.json('Error in saving note!!!')
    }
})

// delete note route *EXTRA*
notes.delete('/:id', (req, res) => {
    const deleteTarget = req.params.id;

    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
            const result = json.filter((note) => note.id !== deleteTarget);

            writeToFile('./db/db.json', result);

            res.json(`Note ${deleteTarget} has been deleted 🗑️`);
    });
});

module.exports = notes