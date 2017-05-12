var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	title: String,
	author: String,
	geo: Number
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
