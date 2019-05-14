// server.js
// where your node app starts

// init project
//requiring the express model and setting the variable app to an instance of it
var express = require('express');
var app = express();

//declaring an array of months
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var bodyParser = require('body-parser');
var cors = require('cors');


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
//create an instance of epress for our app and use bodyparser and cors
app.use(cors({optionSuccessStatus: 200}));// some legacy browsers choke on 204
app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



//your first API endpoint... 
app.get("/api/timestamp", function (req, res) {
 res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});