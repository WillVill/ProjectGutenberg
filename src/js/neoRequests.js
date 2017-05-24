// let baseUrl = 'http://localhost:8080';
const db = "neo4j";

function getNeoCitiesFromBook() {
    var book = document.getElementById('bookToCity').value;

    if (!book) {
        return;
    }

    let endpoint = '/neo4j/book/' + book;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            console.log("neo response", response);
            if (!response) return;
            timeBenchMarkGenerator("neoCities", response.time)
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('bookToCityButton');
elem.addEventListener('click', getNeoCitiesFromBook);


function getNeoAuthorAndBooks() {
    var city = document.getElementById('cityToBookAuthor').value;

    if (!city) {
        return;
    }

    let endpoint = '/neo4j/city/' + city;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            console.log("response", response);
            if (!response) return;
            timeBenchMarkGenerator("neoBookAuthor", response.time)
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('cityToBookAuthorButton');
elem.addEventListener('click', getNeoAuthorAndBooks);


function getNeoVicinityCities() {
    var city = document.getElementById('cityToVicinity').value;

    if (!city) {
        return;
    }

    let endpoint = '/neo4j/geolocation/' + city;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            console.log("response", response);
            if (!response) return;
            timeBenchMarkGenerator("neoGeo", response.time)
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('cityToVicinityButton');
elem.addEventListener('click', getNeoVicinityCities);


function getNeoCitiesAndBooks() {
    var author = document.getElementById('authorToBookCities').value;
    
    if (!author) {
        return;
    }

    let endpoint = '/neo4j/author/' + author;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            console.log("response", response);
            if (!response) return;
            timeBenchMarkGenerator("neoBookCities", response.time)
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('authorToBookCitiesButton');
elem.addEventListener('click', getNeoCitiesAndBooks);
