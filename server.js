const express = require('express');
const path = require('path');
const api = require('./routes/index')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'))

// Default Get route for the Notes page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
)

// Default GET route for homepage
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => 
    console.log(`App is listening for requests at http://localhost:${PORT}`)
)