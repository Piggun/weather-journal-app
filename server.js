// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, () =>{
    console.log('Server running');
    console.log(`Running on localhost: ${port}`);
})


// GET route
app.get('/data', function(req, res) {
    console.log(projectData);
})

app.get('/all', function(req, res) {
    res.send(projectData)
    console.log(projectData)
})

// POST route
app.post('/add', function(req, res) {
    let temperature = req.body.temperature;
    let date = req.body.date;
    let userResponse = req.body.userResponse;
    let city = req.body.name;
    let country = req.body.country;

    projectData.temperature = temperature;
    projectData.date = date;
    projectData.userResponse = userResponse;
    projectData.city = city;
    projectData.country = country;
    console.log(projectData);
})