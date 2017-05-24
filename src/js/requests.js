let baseUrl = 'http://localhost:8080/api';

var books = [{title: "title", author: "author"}, {title: "title1", author: "author1"}];

function getCitiesFromBook() {
    var book = document.getElementById('bookToCity').value;

    if (!book) {
        return;
    }

    let endpoint = '/mongodb/book/' + book;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            if (response.length === 0) return;
            cityTableGenerator(response, 'citiesTable');
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('bookToCityButton');
elem.addEventListener('click', getCitiesFromBook);


function getAuthorAndBooks() {
    var city = document.getElementById('cityToBookAuthor').value;

    if (!city) {
        return;
    }

    let endpoint = '/mongodb/city/' + city;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            console.log("response", response);
            if (response.length === 0) return;
            bookAuthorTableGenerator(response);
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('cityToBookAuthorButton');
elem.addEventListener('click', getAuthorAndBooks);


function getVicinityCities() {
    var city = document.getElementById('cityToVicinity').value;

    if (!city) {
        return;
    }

    let endpoint = '/mongodb/geolocation/' + city;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            console.log("response", response);
            if (response.length === 0) return;
            bookAuthorCityTableGenerator(response);
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('cityToVicinityButton');
elem.addEventListener('click', getVicinityCities);


function getCitiesAndBooks() {
    var author = document.getElementById('authorToBookCities').value;
    
    if (!author) {
        return;
    }

    let endpoint = '/mongodb/author/' + author;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.responseType = 'json';

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            var response = xhr.response;
            console.log("response", response);
            if (response.length === 0) return;
            cityTableGenerator(response.cities, 'bookCitiesTable');
            bookTableGenerator(response.books);
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('authorToBookCitiesButton');
elem.addEventListener('click', getCitiesAndBooks);
