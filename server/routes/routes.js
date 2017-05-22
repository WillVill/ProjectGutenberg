var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/api/book/:book', function (req, res, next) {
	const book = req.params.book;
	console.log("book", book);
});

router.get('/api/city/:city', function (req, res, next) {
	const city = req.params.city;
	console.log("city", city);
});

router.get('/api/geolocation/:city', function (req, res, next) {
	const city = req.params.city;
	console.log("geo", city);
});

router.get('/api/author/:author', function (req, res, next) {
	const author = req.params.author;
	console.log("author", author);
});

module.exports = router;