var neo4j = require('neo4j');
var config = require('../../config.js');

var db = new neo4j.GraphDatabase({
    url: config.db.neo4jdb.url,
    auth: config.db.neo4jdb.auth
});

// Private constructor:
var Book = module.exports = function Book(_node) {
    // All we'll really store is the node; the rest of our properties will be
    // derivable or just pass-through properties
    this._node = _node;
}

// Static methods:

Book.create = function(props, callback) {
    var query = [
        'CREATE (book:Book {props})',
        'RETURN book',
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
        var book = new Book(results[0]['book']);
        callback(null, book);
    });
};

// Book.mention = function(props, callback) {
//     var query = [
//         'MATCH (b:Book {})'
//     ]
// }