var config = require('../config.js');

const app = require('../server/app.js');
var request = require('supertest');
const chai = require('chai');
const should = chai.should();


describe('Neo4j routes tests', function() {
    describe('Find cities by book a title', function() {
        it('should return cities mentioned in the book', function(done) {
            var title = 'Around the World in 80 Days';

            request(app)
            .get('/neo4j/book/' + title)
            .end(function(err, res) {
                var cities = res.body.cities.time;
                if (err) {
                    throw err;
                }
                res.status.should.be.equal(200);
                done();
            });
        });
    });

    describe('Find books by a city name', function() {
        it('should return books that mention the city ', function(done) {
            var city = 'San Francisco';

            request(app)
            .get('/neo4j/city/' + city)
            .end(function(err, res) {

                if (err) {
                    throw err;
                }
                res.status.should.be.equal(200);
                done();
            });
        });
    });

    describe('Find books and cities by an author', function() {
        it('should see the books he wrote and the cities plotted.', function(done) {
            var author = 'Jules Verne';

            request(app)
            .get('/neo4j/author/' + author)
            .end(function(err, res) {

                if (err) {
                    throw err;
                }
                res.status.should.be.equal(200);
                done();
            });
        });
    });

    describe('Find cities in a range of given city', function() {
        it('should return cities within a certain vicinity ', function(done) {
            var geo = 5781061;

            request(app)
            .get('/neo4j/geolocation/' + geo)
            .end(function(err, res) {

                if (err) {
                    throw err;
                }
                res.status.should.be.equal(200);
                done();
            });
        });
    });
});

