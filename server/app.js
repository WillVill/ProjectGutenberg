var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var morgan = require('morgan');

var mongoRoutes = require('./routes/mongoRoutes');
var neoRoutes = require('./routes/neoRoutes');
var index = require('./routes/index');
var config = require('../config.js');

var app = express();
var port = process.env.PORT || 8080;

app.use(morgan('dev')); // log requests to the console

app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../src')));

app.use('/api/mongodb', mongoRoutes);
app.use('/api/neo4j', neoRoutes);
app.use(index);

// connect to Mongo db
mongoose.connect(config.db.mongodb);

app.listen(port);
console.log('Magic happens on port ' + port);

module.exports = app;
