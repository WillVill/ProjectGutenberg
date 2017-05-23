var fs = require('fs');
var Papa = require('papaparse');
var City = require('../server/models/cityNeo.js');
var Book = require('../server/models/bookNeo.js');

function addCityToDB() {
    City.create({
        geo: 2618425,
        name: 'Copenhagen',
        asciiName: 'Copenhagen',
        longitude: '12.56553',
        latitude: '55.67594',
        countryCode: 'DK'
    }, function(err, city) {
        if (err) {
            console.log('something fucked up');
        } else {
            console.log('city added');
        }
    });
}

function addBooksToDB() {
    // get scraped cities from all the books (fileName,title,author,geos)
    var bookMetadata = fs.readFileSync('../book_data.csv', 'utf8');

    Papa.parse(bookMetadata, {
        header: true,
        dynamicTyping: true,
        step: function(row) {
            var arr = stringIntoArray(row.data[0].geos);

            Book.create({
                fileName: row.data[0].fileName,
                title: row.data[0].title,
                author: row.data[0].author,
                geos: arr
            }, function(err, book) {
                if (err) {
                    console.log('something fucked up', err);
                }
            });
        },

        complete: function() {
            // after
        }
    });
}

function stringIntoArray(geoString) {
    return geoString.split('|').slice(0, -1);
}

addBooksToDB();

// CYPHER SCRIPTS:

// POPULATE NEO4J WITH CITIES (takes around 10mins)

// USING PERIODIC COMMIT 500
// LOAD CSV WITH HEADERS FROM "file:///scraped_cities5000.csv" AS row
// MERGE (:City {geo: row.geo, name: row.name, asciiName: row.asciiName, longitude: row.longitude, latitude: row.latitude, countryCode: row.countryCode});

// MAP BOOKS AND MANTIONED CITIES
// MATCH (a:Book)
// FOREACH (geos in a.geos | merge (b:City {geo:geos}) merge (a)-[:MENTIONES]->(b));