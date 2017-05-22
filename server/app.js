var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var morgan = require('morgan');

var Book = require('./models/book');
var routes = require('./routes/routes');

var app = express();
var port = process.env.PORT || 8080;

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.use(express.static(path.join(__dirname, '../src')));
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'jade');

// connect to Mongo db
// mongoose.connect('mongo-URL');


app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
