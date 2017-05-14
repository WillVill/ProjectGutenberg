var fs = require('fs');
var utils = require('./utils.js');
var colors = require('colors');

// returns an array of strings (potential cities) from the given book
function getPotentialCitiesFromBook(book) {
    // remove Gutenberg footer which is the same in every book
    var licenceCrap = `*** END OF THE PROJECT GUTENBERG EBOOK`;
    var licenceIndex = book.indexOf(licenceCrap);
    if (licenceIndex !== -1) {
        // grab everything what's before
        book = book.substring(0, licenceIndex);
    }

    // regular expression for all the potential cities
    var regex = /[A-Z]+(?:[\s]?)(?:[\.]?[\s]?)?[A-Za-z. ]*/gm;
    // get potential cities and join them in one big string
    var potentialCities = book.match(regex).join("|");

    return potentialCities;
}

function getCities() {
    // scraped_cities15000 is the SMALL one; scraped_cities5000 is twice as big!!
    var cities = fs.readFileSync('../../../scraped_cities/scraped_cities5000.txt', 'utf8');
    var cityJSON = JSON.parse(cities);
    return cityJSON;
}

function scrapeBook(bookFile, cities) {
    var book = fs.readFileSync(bookFile, 'utf8');
    var potentialCities = getPotentialCitiesFromBook(book);
    var dir = "../../../";
    var geos = '';

    var length = cities.length;
    cities.forEach((city, index) => {
        // Check if the city is included inside of the potential cities string
        // Space in the end prevents from catching cities as parts of some other words. Nothing in a begining since a sentence could start from a city name.
        if (potentialCities.indexOf(city.name + " ") !== -1) {
            if (index === length - 1) {
                geos += parseInt(city.geo);
            } else {
                geos += parseInt(city.geo) + '|';                
            }
        }   
    });

    var title = getTitle(book);
    var author = getAuthor(book);
    // substring stripe depends on the length of the dir path - requires change if dir is different from `/Users/Luke/Desktop/books_part_1/`
    var fileName = bookFile.substring(33, bookFile.length);

    var bookMetadata = combineBookData(fileName, title, author, geos);

    utils.saveToFile(bookMetadata, dir, "book_data", "csv");
}

// scrapes city name and its geolocation from the given file
function scrapeCities(citiesFile) {
    fs.readFile(citiesFile, 'utf8', function(err, cities) {  
        if (err) throw err;

        var arrCities = [];
        var city = [];

        var arrLines = cities.split('\n');

        for (var i = 0; i < arrLines.length; i++) {
            city = arrLines[i].split(/\t/, 9);
            arrCities.push({
                geo: city[0],
                name: city[2],
                asciiName: city[1],
                longitude: city[5],
                latitude: city[4],
                countryCode: city[8]
            });
        }

        utils.saveToFile(arrCities, "../../../scraped_cities/", "scraped_cities5000", "csv");
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
    return "Unknown";
}

function getAuthor(book) {
    var authorArr = book.match(/Author:\s+((?![\r\n]+\w)[0-9-(.)':a-zA-Z,"/ \r\n\t])+/);

    if (authorArr) {
        return authorArr[0].substring(8);
    }
    return "Unknown";
}

function combineBookData(fileName, title, author, geos) {
    var arr = [];

    arr.push({
        fileName: fileName,
        title: title,
        author: author,
        cityGeo: geos
    });

    return arr;
}

function scrapeBooks(dirWithBooks) {
    // get collection of cities
    var cities = getCities();
    // get collection of book files
    var files = fs.readdirSync(dirWithBooks);
    // skip the .DS_Store file - it stores custom attributes of its containing folder
    files.splice(0, 1);

    var amountOfFiles = files.length;
    var i = 1;

    files.forEach(file => {
        console.time("Time");
        console.log("\nProcessing file: " + file.yellow + "\t" + colors.cyan(i + " out of " + amountOfFiles) + "\t" + utils.getProgressPercentage(i, amountOfFiles).magenta);
        scrapeBook(dirWithBooks + file, cities);
        console.timeEnd("Time");
        i++;
    });
}

// scrapeCities('/Users/Luke/Desktop/cities5000.txt');
scrapeBooks('/Users/Luke/Desktop/books_part_2/');