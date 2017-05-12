var fs = require('fs');
var utils = require('./utils.js');
var title;
var author;
var citiesArr = [];

// returns an array of strings (potential cities) from the given book
function getBookStrings(bookFile, callback) {
    var readStream = fs.createReadStream(bookFile, 'utf8');
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
    fs.readFile('/Users/Luke/Desktop/ProjectGutenberg/scraped_cities/scraped_cities5000.txt', 'utf8', function(err, cities) {
        if (err) throw err;

        var cityJSON = JSON.parse(cities);
        callback(cityJSON);
    });
}

function getCitiesFromBook(bookFile) {
    getBookStrings(bookFile, (bookStrings) => {
        getCities(cities => {

            for (var j = cities.length - 1; j >= 0; j--) {
                if (bookStrings.indexOf(cities[j].name + " ") !== -1) {
                    citiesArr.push(cities[j]);
                }  
            }

            var dataFromBook = createData();
            var dir = "../../../";

            utils.saveToFile(dataFromBook, dir, "book_data", "csv");
        });
    });
}

// getCitiesFromBook('/Users/Luke/Desktop/testing_files/238.txt');
// scrapeCities('/Users/Luke/Desktop/cities15000.txt');
scrapeAllBooks();

// scrapes city name and its geolocation from the given file
function scrapeCities(citiesFile) {
    fs.readFile(citiesFile, 'utf8', function(err, cities) {  
        if (err) throw err;

        var arrCities = [];
        var city = [];

        var arrLines = cities.split('\n');

        for (var i = 0; i < arrLines.length; i++) {
            city = arrLines[i].split(/\t/, 3);

            arrCities.push({
                name: city[2],
                geo: city[0]
            });
        }

        utils.saveToFile(arrCities, "/Users/Luke/Desktop/ProjectGutenberg/scraped_cities/", "scraped_cities15000", "csv");
    });
}

function getTitle(book) {
    var titleArr = book.match(/Title:\s+((?![\r\n]+\w)[0-9-(.)':a-zA-Z,"/ \r\n\t])+/);

    if (titleArr) {
        return titleArr[0]
            .substring(7)
            .replace("\r","")
            .split("\n")
            .map(function(i) {
                return i.replace(/^\s+/, '');
            })
            .join(" ");    
    }
    return "UNKNOWN";
}

function getAuthor(book) {
    var authorArr = book.match(/Author:\s+((?![\r\n]+\w)[0-9-(.)':a-zA-Z,"/ \r\n\t])+/);

    if (authorArr) {
        return authorArr[0].substring(8);
    }
    return "UNKNOWN";
}

function createData() {
    var arr = [];
    for (var i = citiesArr.length - 1; i >= 0; i--) {
        arr.push({
            title: title,
            author: author,
            cityGeo: citiesArr[i].geo
        });
    }

    return arr;
}

function scrapeAllBooks() {
    fs.readdir('/Users/Luke/Desktop/testing_files/', (err, files) => {
        // in this case for loop skips the last file which is the .DS_Store file - it stores custom attributes of its containing folder
        for (var i = files.length - 1; i >= 1; i--) {
            console.log(files[i]);
            getCitiesFromBook('/Users/Luke/Desktop/testing_files/' + files[i]);
        }
    });
}

// geolocation: arrLines[i].match(/^\d+|\d+\b|\d+/).shift()
