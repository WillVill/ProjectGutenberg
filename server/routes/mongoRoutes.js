var express = require('express');
var router = express.Router();

var Book = require('../models/bookMongoDB.js');
var City = require('../models/cityMongoDB.js');

router.get('/book/:book', (req, res, next) => {
	var t1 = new Date();
	var t2;

	Book.find({title: req.params.book})
		.then(book => {

			return book[0].geos;
		})
		.then(geolocations => {
			var _promises = [];
			for (var i = geolocations.length - 1; i >= 0; i--) {
				_promises.push(City.find({geo: geolocations[i]}))
			}
			// geolocations.map(geo => {
			// 	_promises.push(City.find({geo: geo.geo}))
			// })
			return Promise.all(_promises);
		})
		.then(data => {
			t2 = new Date();
			var cities = [];
			data.forEach(city => {
			    cities.push(city[0]);
			});
			return cities;
		})
		.then(cities => {
			var time = t2-t1;
			console.log("time: "+ time);
			res.json({cities: cities, time: time});
		})
		.catch(err => {
			console.log("error", err);
			res.status(500).json({error: err});
		});
});

router.get('/city/:city', function (req, res, next) {
	var city = req.params.city;
	var t1 = new Date();
	var t2;

	City.find({name: city})
		.then(city => {
			return Book.find({geos: city[0].geo});
		})
		.then(books => {
			t2 = new Date();
			var time = t2-t1;
			console.log("time: "+ time);
			res.json({books: books, time: time});
		})
		.catch(err => {
			console.log("error", err);
			res.status(500).json({error: err});
		});
});

router.get('/geolocation/:geo/:distance', function (req, res, next) {
	var geo = req.params.geo;
	var distance = req.params.distance;
	var t1 = new Date();
	var t2;

	City.find({geo: geo})
		.then(city => {
			// console.log("city", city[0].loc, distance);
			return City.find({  
				loc: {
			      $near: {
			        $geometry: {
			           type: "Point" ,
			           coordinates: city[0].loc
			        },
			        $maxDistance: distance
			      }
			    }
				// loc: {
				//     $near: city[0].loc,
				// 	$maxDistance: distance
			 //    },
			})
		})
		.then(cities => {
			// console.log("cities", cities);
			t2 = new Date();
			var time = t2-t1;
			console.log("time: "+ time);
			res.json({cities: cities, time: time});
		})
		.catch(err => {
			console.log("error", err);
			res.status(500).json({error: err});
		});
});

router.get('/author/:author', function (req, res, next) {
	var author = req.params.author;
	var t1 = new Date();
	var t2;
	var booksWritten;
	res.setHeader('Content-Type', 'application/json')

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
			var _promises = [];
			for (var i = geos.length - 1; i >= 0; i--) {
				_promises.push(City.find({geo: geos[i]}));
			}
			// for (var i = geos.length - 1; i >= 0; i--) {
			// 	_promises.push(City.find({geo: geos[i].geo}));
			// }
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
			res.json({cities: cities, books: booksWritten, time: time});
		})
		.catch(err => {
			console.log("error", err);
			res.status(500).json({error: err});
		});
});

module.exports = router;