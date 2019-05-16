// server.js
// where your node app starts

// init project
//requiring the express model and setting the variable app to an instance of it
var express = require('express');
var app = express();


app.use(function middleware(req, res, next) {
console.log(req.method + ' ' + req.path + ' - ' + req.ip)
next();
});


var bodyParser = require('body-parser');
var cors = require('cors');

var getUnixTimestamp = date => ({
  unix: date.getTime(),
  utc: date.toUTCString()
});
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
app.use(cors({optionSuccessStatus: 200}));// some legacy browsers choke on 204

app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//your first API endpoint... 
//if the date string is empty it should trigger the current date
app.get("/api/timestamp/", function (req, res) {
  res.json(getUnixTimestamp(new Date()));
});


app.get("/api/timestamp/:date_string", function (req, res) {
  let dateString = req.params.date_string;
  var dateStringRegex = new RegExp(/\d{4}-\d{2}-\d{2}/g);
  
  let myDate; 
  let isDate = dateStringRegex.test(dateString);
  
  if (isDate){
    // we know its a date, e.g "2016-11-20"
    myDate = new Date(dateString);
  }else{
    // we know it IS a number, so must be a timestamp
    let parsedInt = parseInt(dateString);
    myDate = new Date(parsedInt);
  }
 res.json(getUnixTimestamp(myDate));
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});