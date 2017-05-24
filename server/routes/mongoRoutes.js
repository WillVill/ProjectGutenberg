var express = require('express');
var router = express.Router();

var Book = require('../models/book.js');
var City = require('../models/city.js');

router.get('/book/:book', (req, res, next) => {
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
			var t2 = new Date();
			var cities = [];
			data.forEach(city => {
			    cities.push(city[0]);
			});
			return cities;
		})
		.then(cities => {
			var time = t2-t1;
			console.log("time: "+ time);
			res.json(cities);
		})
		.catch(err => {
			console.log("error", err);
			res.status(500).json({error: err});
		});
});



router.get('/city/:city', function (req, res, next) {
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

router.get('/geolocation/:city', function (req, res, next) {
	var city = req.params.city;
	console.log("geo", city);
	var t1 = new Date();
	var t2 = new Date();

	res.setHeader('Content-Type', 'application/json')
	res.json(books);
});

router.get('/author/:author', function (req, res, next) {
	var author = req.params.author;
	var t1 = new Date();
	var t2;
	var booksWritten;

	Book.find({author: author})
		.then(books => {
			booksWritten = books;
			var cityGeos = [];
			books.forEach(book => {
				for (var i = book.geos.length - 1; i >= 0; i--) {
					cityGeos.push(book.geos[i]);
				}
			})
			return cityGeos;
		})
		.then(geos => {
			let _promises = [];

			for (var i = geos.length - 1; i >= 0; i--) {
				_promises.push(City.find({geo: geos[i].geo}));
			}
			return Promise.all(_promises);
		})
		.then(data => {
			t2 = new Date();
			var cities = [];
			data.forEach(city => {
			    cities.push(city[0]);
			});
			return cities;
		}).then(cities => {
			var time = t2-t1;
			console.log("time: "+ time);
			res.json({cities: cities, books: booksWritten});
		})
		.catch(err => {
			console.log("error", err);
			res.status(500).json({error: err});
		});

	res.setHeader('Content-Type', 'application/json')});

module.exports = router;