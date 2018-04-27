// Basic Setup
const http     = require('http');
const express  = require('express');
const parser   = require('body-parser');
const morgan   = require('morgan');
//const mysql = require('mysql');

const port = 3000;

//Create connection to database
const connection = require('./dbconnection');
connection.connect();


// Setup express
var app = express();
app.use(morgan('combined'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', port);

// Allow CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Set default route
app.get('/', function (req, res) {
	res.send('<html><body><p>Welcome to the Haulage API</p></body></html>');
});

// add router routes
app.use('/class', require('./routes/class'));
app.use('/motivepower', require('./routes/motivepower'));
app.use('/location', require('./routes/location'));
app.use('/journey', require('./routes/journey'));
app.use('/train', require('./routes/train'));
app.use('/trainLocation', require('./routes/trainLocation'));
app.use('/journeyLocation', require('./routes/journeyLocation'));
app.use('/haulage', require('./routes/haulage'));
app.use('/haulageMp', require('./routes/haulageMp'));


// Create server
http.createServer(app).listen(app.get('port'), function(){
  const now = new Date();
	console.log('Server listening on port ' + app.get('port') + ' at ' + now.toTimeString());
});
