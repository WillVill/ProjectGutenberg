
const Book = module.exports = function(bookObj) {
    const book = bookObj.properties;
    this.title = book.title;
    this.author = book.author;
    this.fileName = book.fileName;
    this.geo = book.geo;
};