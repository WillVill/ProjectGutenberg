// var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config.js');

const app = require('../server/app.js');
const chai = require('chai');
const should = chai.should();


describe('Mongo routes tests', function() {
	// var url = "localhost:8080"

	// before(function(done) {
	// 	mongoose.connect(config.db.mongodb);
	// 	done();
	// });

	describe('Find cities by book a title', function() {
	    it('should return cities mentioned in the book', function(done) {
	        var title = 'Around the World in 80 Days';

		    request(app)
		    .get('/mongodb/book/' + title)
		    .end(function(err, res) {
		    	var cities = res.body.cities;

		        if (err) {
			        throw err;
		        }
		        res.status.should.be.equal(200);
		        cities.should.be.a('array');
		        cities.length.should.be.equal(232);
		        done();
	        });
	    });
	});

	describe('Find books by a city name', function() {
	    it('should return books that mention the city ', function(done) {
	        var city = 'San Francisco';

		    request(app)
		    .get('/mongodb/city/' + city)
		    .end(function(err, res) {
		    	var books = res.body.books;

		        if (err) {
			        throw err;
		        }
		        books.should.be.a('array');
		        books.length.should.be.equal(2);
		        res.status.should.be.equal(200);
		        done();
	        });
	    });
	});

	describe('Find cities in a range of given city', function() {
	    it('should return cities within a certain vicinity', function(done) {
	        var geo = 5781061;
	        var distance = 3000;

		    request(app)
		    .get('/mongodb/geolocation/' + geo + '/' + distance)
		    .end(function(err, res) {
		    	var cities = res.body.cities;

		        if (err) {
			        throw err;
		        }
		        cities.should.be.a('array');
		        cities.length.should.be.equal(2);
		        res.status.should.be.equal(200);
		        done();
	        });
	    });
	});

	describe('Find cities in a range of given city', function() {
	    it('should return cities within a certain vicinity', function(done) {
	        var geo = 5778244;
	        var distance = 8000;

		    request(app)
		    .get('/mongodb/geolocation/' + geo + '/' + distance)
		    .end(function(err, res) {
		    	var cities = res.body.cities;
		    	
		        if (err) {
			        throw err;
		        }
		        cities.should.be.a('array');
		        cities.length.should.be.equal(11);
		        res.status.should.be.equal(200);
		        done();
	        });
	    });
	});

	describe('Find books and cities by an author', function() {
	    it('should see the books he wrote and the cities plotted.', function(done) {
	        var author = 'Jules Verne';

		    request(app)
		    .get('/mongodb/author/' + author)
		    .end(function(err, res) {
		    	var books = res.body.books;
		    	var cities = res.body.cities;

		        if (err) {
			        throw err;
		        }
		        books.length.should.be.equal(1);
		        cities.length.should.be.equal(232);

		        books.should.be.a('array');
		        cities.should.be.a('array');

		        res.status.should.be.equal(200);
		        done();
	        });
	    });
	});
});

