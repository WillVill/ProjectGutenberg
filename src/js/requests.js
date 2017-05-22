let baseUrl = 'http://localhost:8080/api'

function getCitiesFromBook() {
    var book = document.getElementById('bookToCity').value;
    let endpoint = '/book/' + book;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            // document.getElementById('userCount').textContent=xhr.response;
            console.log("response", xhr.response);
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
    let endpoint = '/city/' + city;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            // document.getElementById('userCount').textContent=xhr.response;
            console.log("response", xhr.response);
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
    let endpoint = '/geolocation/' + city;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            // document.getElementById('userCount').textContent=xhr.response;
            console.log("response", xhr.response);
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
    let endpoint = '/author/' + author;
    let url = baseUrl + endpoint;
    let xhr = new XMLHttpRequest();

    xhr.open('GET', url);

    xhr.onload = function() {   
        if (xhr.status === 200 || xhr.status === 204) {
            // document.getElementById('userCount').textContent=xhr.response;
            console.log("response", xhr.response);
        } else {
            console.log("error with request");
        }
    };
    xhr.send();
}

var elem = document.getElementById('authorToBookCitiesButton');
elem.addEventListener('click', getCitiesAndBooks);
