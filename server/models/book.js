var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    fileName: String,
	title: String,
	author: String,
	geos: [Number]
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
