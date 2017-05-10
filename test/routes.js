var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../config.js');

describe('Routing', function() {
	var url = "localhost:8080"

	before(function(done) {
		mongoose.connect(config.db.mongodb);
		done();
	});

	describe('Book', function() {
	    it('should return error trying to save duplicate book', function(done) {
	        var book = {
		        title: 'Yolo',
		        author: 'King Julian'
	        };

		    request(url)
		    .post('/api/books')
		    .send(book)
		    .end(function(err, res) {
		        if (err) {
			        throw err;
		        }
		        res.status.should.be.equal(400);
		        done();
	        });
	    });
	});
});

