var express = require('express');
var router = express.Router();
var Book = require('../models/book.js');
var City = require('../models/city.js');


router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/api/book/:book', (req, res, next) => {
	var t1 = new Date();
	var t2;

	Book.find({title: req.params.book})
		.then(book => {
			return book[0].geos;
		})
		.then(geolocations => {
			let _promises = [];
			geolocations.map(geo => {
				_promises.push(City.find({geo: geo.geo}))
			})
			return Promise.all(_promises);
		})
		.then(data => {
			var cities = [];
			data.forEach(city => {
			    cities.push(city[0]);
			});
			return cities;
		})
		.then(cities => {
			res.json(cities);
		})
		.catch(err => {
			console.log("error", err);
			res.status(500).json({error: err});
		});
});



router.get('/api/city/:city', function (req, res, next) {
	var city = req.params.city;
	console.log("city", city);
	var t1 = new Date();

	Book.find({title: book}, function (err, book) {
		if (err) console.log("Error: ", err);

		if(!book || book.length === 0) {
			res.json([]);
			return;
		}

		var t2 = new Date();
		var time = t2-t1;
		var author = book[0].author;
		var title = book[0].title;
		
		res.setHeader('Content-Type', 'application/json')
		res.json(books);
	});
});

router.get('/api/geolocation/:city', function (req, res, next) {
	var city = req.params.city;
	console.log("geo", city);
	var t1 = new Date();
	var t2 = new Date();

	res.setHeader('Content-Type', 'application/json')
	res.json(books);
});

router.get('/api/author/:author', function (req, res, next) {
	var author = req.params.author;
	console.log("author", author);
	var t1 = new Date();
	var t2 = new Date();

	res.setHeader('Content-Type', 'application/json')
	res.json(books);
});

module.exports = router;