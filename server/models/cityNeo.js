var neo4j = require('neo4j');
var config = require('../../config.js');

var db = new neo4j.GraphDatabase({
    url: config.db.neo4jdb.url,
    auth: config.db.neo4jdb.auth
});

// Private constructor:
var City = module.exports = function City(_node) {
    // All we'll really store is the node; the rest of our properties will be
    // derivable or just pass-through properties
    this._node = _node;
}

// Static methods:

City.create = function(props, callback) {
    var query = [
        'CREATE (city:City {props})',
        'RETURN city',
        ].join('\n');

    var params = {
        props: props
    };

    db.cypher({
        query: query,
        params: params
    }, function(err, results) {
        if (err) {
            return callback(err);
        }
        var city = new City(results[0]['city']);
        callback(null, city);
    });
};

City.

// Book given, I should see a map with all cities mentioned in the book plotted on a map. 
//
// MATCH (book:Book {title: 'Hacker Crackdown Law and Disorder on the Electronic Frontier'})-[:MENTIONES]->(n:City) RETURN n.name

// City given, I can get the books mentioning the cities and authors of the books.
//
// MATCH (c:City {name: 'Warsaw', countryCode: 'PL'})<-[:MENTIONES]-(b:Book) RETURN b.title, b.author

// City given, books mentioning a city within the vicinity of 50 km are returned.
//
// 

// Author given, I should see the books he wrote and the cities plotted.
//
// MATCH (b:Book {author: 'Various'})-[:MENTIONES]->(c:City) RETURN b.title, c.name