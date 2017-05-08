var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var port = process.env.PORT || 8080;
var Book = require('./src/models/book');
var routes = require('./src/js/routes/routes');
var path = require('path');

app.use(morgan('dev')); // log requests to the console

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'jade');

// connect to Mongo db
// mongoose.connect('mongo-URL');


app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
