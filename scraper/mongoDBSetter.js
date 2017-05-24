var fs = require('fs');
var config = require('../config.js');
var Papa = require('papaparse');

var mongoose = require('mongoose');
var bookSchema = require('../server/models/book.js').Book;
var Book = mongoose.model('Book', bookSchema);
var citySchema = require('../server/models/city.js').City;
var City = mongoose.model('City', citySchema);

function getConnection() {
    mongoose.connect(config.db.mongodb);
    return mongoose.connection;
}

function addBooksToDB() {
    // get scraped cities from all the books (fileName,title,author,geos)
    var bookMetadata = fs.readFileSync('../book_data.csv', 'utf8');
    var db = getConnection();

    Papa.parse(bookMetadata, {
        header: true,
        dynamicTyping: true,
        step: function(row) {
            var geoArr = [];
            var bookDoc = new Book({
                fileName: row.data[0].fileName,
                title: row.data[0].title,
                author: row.data[0].author,
            });
            geoArr = stringIntoArray(row.data[0].geos);
            bookDoc.geos = geoArr

            bookDoc.save(function (err, bookDoc) {
              if (err) return console.error(err);
            });
        },

        complete: function() {
            db.close();
        }
    });
}

function stringIntoArray(geoString) {
    return geoString.split('|').slice(0, -1);
}

/**
 *  Import cities collection from a csv file to the mongoDB
 *  using script below. Change a path to the scraped_cities5000.csv file.
 *  (from the project dir -> ../../../scraped_cities/scraped_cities5000.csv)
 *
 *  mongoimport --drop --db mongoTest --collection cities --type csv --headerline --file /Users/Luke/Desktop/ProjectGutenberg/scraped_cities/scraped_cities5000.csv
 */

function addCitiesToDB() {
    var citiesMetadata = fs.readFileSync('../scraped_cities/scraped_cities5000.csv', 'utf8');
    var db = getConnection();

    Papa.parse(citiesMetadata, {
        header: true,
        dynamicTyping: true,
        step: function(row) {
            var locArr = [];

            var cityDoc = new City({
                geo: row.data[0].geo,
                name: row.data[0].name,
                asciiName: row.data[0].asciiName,
                countryCode: row.data[0].countryCode,
            });

            locArr.push(row.data[0].longitude);
            locArr.push(row.data[0].latitude);
            cityDoc.loc = locArr;

            cityDoc.save(function (err, cityDoc) {
              if (err) return console.error(err);
            });
        },

        complete: function() {
            db.close();
        }
    });
 }

// addCitiesToDB();
addBooksToDB();
