// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 7979;
const server = app.listen(port, listening);
function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
  };

// Anticipates a GET request from client-side and responds with all data.
app.get("/allData", sendAllData);

// Works as a call back function to allData GET request.
function sendAllData(request, response) {
    response.send(projectData);
}

// Anticipates a POST request from client-side and calls saveData function.
app.post("/addData", saveData);

// Saves received data into our projectData object.
function saveData(request, response) {
    console.log(request.body);
    projectData.date = request.body.date;
    projectData.temperature = request.body.temperature;
    projectData.feeling = request.body.feeling;
}

