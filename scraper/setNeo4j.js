const driver = require('../server/connector/neo4j');
const session = driver.getDriver();
var fs = require('fs');
var Book = require('../server/models/bookNeo4j.js');
var City = require('../server/models/cityNeo4j.js');
var Papa = require('papaparse');
var utils = require('./utils.js');

function setBook(book) {
    session
        .run(
            'CREATE (b:Book {fileName: {fileNameParam}, title: {titleParam},' +
            'author: {authorParam}, geo: {geoParam} } ) RETURN b',
            {
                fileNameParam: book.fileName,
                titleParam: book.title,
                authorParam: book.author,
                geoParam: book.geo
            })
        .then(result => {
            session.close();
            result.records.forEach(record => {
                return new Book(record.get('b'));
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function setBooks() {
    var bookMetadata = fs.readFileSync('../book_data.csv', 'utf8');

    Papa.parse(bookMetadata, {
        header: true,
        dynamicTyping: true,
        step: function(row) {
            var geo = utils.stringIntoArray(row.data[0].geos);
            var fileName = row.data[0].fileName;
            var title = row.data[0].title;
            var author = row.data[0].author;

            if (fileName && title && author) {
                setBook({
                    fileName: fileName,
                    title: title,
                    author: author,
                    geo: geo
                });
            } else {
                console.log("The book might not have been added")
            }
        },

        complete: function() {
            console.log("done");
        }
    });
}

function setCity(city) {
    session
        .run(
            'CREATE (c:City {name: {nameParam}, asciiName: {asciiNameParam},' +
            'loc: {locParam}, countryCode: {countryCodeParam}, geo: {geoParam} } ) RETURN c',
            {
                nameParam: city.name,
                asciiNameParam: city.asciiName,
                locParam: city.loc,
                countryCodeParam: city.countryCode,
                geoParam: city.geo
            })
        .then(result => {
            session.close();
            result.records.forEach(record => {
                return new City(record.get('c'));
            });
        })
        .catch(err => {
            console.log(err);
        });
}

function setCities() {
    var citiesMetadata = fs.readFileSync('../scraped_cities/scraped_cities5000.csv', 'utf8');

    Papa.parse(citiesMetadata, {
        header: true,
        dynamicTyping: true,
        step: function(row) {
            var geo = row.data[0].geo;
            var name = row.data[0].name;
            var asciiName = row.data[0].asciiName;
            var countryCode = row.data[0].countryCode;
            var locArr = [];
            locArr.push(row.data[0].longitude);
            locArr.push(row.data[0].latitude);

            if (name && asciiName && countryCode && geo) {
                setCity({
                    name: name,
                    asciiName: asciiName,
                    countryCode: countryCode,
                    loc: locArr,
                    geo: geo
                });
            } else {
                console.log("The city might not have been added")
            }
        },

        complete: function() {
            console.log("done");
        }
    });
}

setCities();

// CYPHER SCRIPTS:

// POPULATE NEO4J WITH CITIES (takes around 10mins)

// USING PERIODIC COMMIT 500
// LOAD CSV WITH HEADERS FROM "file:///scraped_cities5000.csv" AS row
// MERGE (:City {geo: row.geo, name: row.name, asciiName: row.asciiName, longitude: row.longitude, latitude: row.latitude, countryCode: row.countryCode});

// MAP BOOKS AND MANTIONED CITIES
// MATCH (a:Book)
// FOREACH (geos in a.geos | merge (b:City {geo:geos}) merge (a)-[:MENTIONES]->(b));