var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
	name: String,
	author: String,
	cities: [{name: String,
			geo: Number}],
});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
