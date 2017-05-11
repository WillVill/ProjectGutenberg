var fs = require('fs');
var title;
var author;
var citiesArr = [];

// returns an array of strings (potential cities) from the given book
function getBookStrings(callback) {
    var readStream = fs.createReadStream('/Users/Luke/Desktop/38946.txt', 'utf8');
    var book = '';

    readStream.on('data', function(chunk) {  
        book += chunk;
    }).on('end', function() {
        var regex = /[A-Z]+(?:[\s]?)(?:[\.]?[\s]?)?[A-Za-z. ]*/gm;
        var data = book.match(regex).join("|");

        title = getTitle(book);
        author = getAuthor(book);

        callback(data);
    });
}

// reuturns an array of city objects;
function getCities(callback) {
    fs.readFile('../../../scraped_cities/scraped_cities15000.txt', 'utf8', function(err, cities) {
        if (err) throw err;

        var cityJSON = JSON.parse(cities);
        callback(cityJSON);
    });
}

function getCitiesFromBook() {
    getBookStrings(bookStrings => {
        getCities(cities => {

            for (var j = cities.length - 1; j >= 0; j--) {
                if (bookStrings.indexOf(cities[j].name + " ") !== -1) {
                    citiesArr.push(cities[j]);
                }  
            }

            citiesArr.removeDuplicates(); // perhaps unnecessary - to verify later

            console.log(createData());
            process.exit(0);
        });
    });

    
}

// FUNCTIONS for either getting cities from a single book or scrapeing cities
// getCitiesFromBook();
// scrapeCities();

// scrapes city name and its geolocation from the given in the exercise file
function scrapeCities() {
    fs.readFile('/Users/Luke/Desktop/cities5000.txt', 'utf8', function(err, cities) {  
        if (err) throw err;

        var arrCities = [];
        var city = [];

        var arrLines = cities.split('\n');

        for (var i = 0; i < arrLines.length; i++) {
            city = arrLines[i].split(/\t/, 2);

            arrCities.push({
                name: city[1],
                geo: city[0]
            });
        }

        saveToFile(arrCities);
    });
}

// saves arr of city objects into a text file
function saveToFile(arr) {
    arr = JSON.stringify(arr);
    var dir = "../../../scraped_cities/";
    var fileName = "scraped_cities5000.txt";
    fs.writeFile(dir.concat(fileName), arr, function(err) {
        if (err) throw err;

        console.log("The file " + fileName + " was saved in " + dir);
    });
}

// geolocation: arrLines[i].match(/^\d+|\d+\b|\d+/).shift()

Array.prototype.removeDuplicates = function() {
    var unique = [];
    var current;

    for (var i = this.length - 1; i >= 0; i--) {
        current = this[i];
        if (unique.indexOf(current) < 0) unique.push(current);
    }

    return unique;
}

function getTitle(book) {
    return book.match(/Title:\s+((?![\r\n]+\w)[0-9-(.)':a-zA-Z,"/ \r\n\t])+/)[0]
    .substring(7)
    .replace("\r","")
    .split("\n")
    .map(function(i) {
        return i.replace(/^\s+/, '');
    })
    .join(" ");
}

function getAuthor(book) {
    return book.match(/Author:\s+((?![\r\n]+\w)[0-9-(.)':a-zA-Z,"/ \r\n\t])+/)[0].substring(8);
}

function createData() {
    return {
        title: title,
        author: author,
        cities: citiesArr
    };
}
