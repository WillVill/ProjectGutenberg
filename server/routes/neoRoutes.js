const express = require('express');
const router = express.Router();

const driver = require('../connector/neo4j');
const session = driver.getDriver();

// Get cities by a book title
router.get('/book/:book', (req, res, next) => {
    var title = req.params.book;

    session
        .run('MATCH (b:Book {title: {titleParam}})-[:MENTIONES]->(c:City) RETURN c', {titleParam:title})
        .then(result => {
            var cities = [];
            session.close();
            result.records.forEach(record => {
                cities.push(
                    record._fields[0].properties
                );
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

// City given, I can get the books mentioning the cities and authors of the books
router.get('/city/:city', (req, res, next) => {
    var name = req.params.city;

    session
        .run('MATCH (c:City {name: {nameParam}})<-[:MENTIONES]-(b:Book) RETURN b', {nameParam:name})
        .then(result => {
            var books = [];
            session.close();
            result.records.forEach(record => {
                books.push({
                    title: record._fields[0].properties.title,
                    author: record._fields[0].properties.author
                });
            });
            return books;
        })
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({error: err});
        });
});

// Author given, I should see the books he wrote and the cities plotted
router.get('/author/:author', (req, res, next) => {
    var author = req.params.author;

    session
        .run('MATCH (b:Book {author: {authorParam}})-[:MENTIONES]->(c:City) ' +
            'with b, collect({name: c.name, geo: c.geo, longitude: c.longitude, latitude: c.latitude}) as nodes ' +
            'with {title: b.title, cities: nodes} as containerNode ' +
            'RETURN {books: collect(containerNode)}',
            {authorParam:author})
        .then(result => {
            const booksAndCities = result.records[0]._fields[0];
            session.close();
            return booksAndCities;
        })
        .then(booksAndCities => {
            res.json(booksAndCities);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({error: err});
        });
});

// Given a geolocation, your application lists all books mentioning a city in vicinity of the given geolocation.
router.get('/geolocation/:geo', (req, res, next) => {
    var geo = req.params.geo;

    session
        .run('MATCH (c:City {geo: {geoParam}})<-[:MENTIONES]-(b:Book) RETURN b, c', {geoParam:geo})
        .then(result => {
            var books = [];
            var obj = {};
            session.close();

            obj = {
                name: result.records[0]._fields[1].properties.name,
                longitude: result.records[0]._fields[1].properties.longitude,
                latitude: result.records[0]._fields[1].properties.latitude
            }
            result.records.forEach(record => {
                books.push(
                    record._fields[0].properties.title
                );
            });
            obj.books = books;
            return obj;
        })
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.log("error", err);
            res.status(500).json({error: err});
        });
});

module.exports = router;