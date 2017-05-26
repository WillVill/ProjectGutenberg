var {defineSupportCode} = require('cucumber');
// var seleniumDriver = require('selenium-webdriver');
var World = require('../support/world');
var Browser = require("zombie");
var browser = new Browser();
var assert = require('assert');

defineSupportCode(function({setWorldConstructor, Given, When, Then}) {
    // setWorldConstructor(World);

    Given('I am a user of the web application', function(callback) {
        browser.visit('http://localhost:8080/', function() {
            browser.assert.element('.title');
            callback();
        });
    });

    When('I select author {author}', function(author, callback) {
        browser
            .fill('#authorToBookCities', author)
            callback();
    });

    When('I select city {city}', function(city, callback) {
        browser
            .fill('#cityToBookAuthor', city)
            callback();
    });

    When('I select geo-city {city}', function(city, callback) {
        browser
            .fill('#cityToVicinity', city)
            callback();
    });

    When('I select book {book}', function(book, callback) {
        browser
            .fill('#bookToCity', book)
            callback();
    });

    When('I click {buttonId}', function(buttonId, callback) {
        var button = "#"+buttonId;
        browser
            .pressButton(button)
            callback();
    });

    Then('I should see the books written by the author', function(callback) {
        setTimeout(function(){
            browser.assert.element("#bookTitleTable");
            callback();
        }, 4*1000)
    });

    Then('I should see the cities mentioned in the books', function(callback) {
        setTimeout(function(){
            browser.assert.element("#citiesTableTable");
            callback();
        }, 4*1000)
    });

    Then('I should see the cities plotted on a map', function(callback) {
        setTimeout(function(){
            browser.assert.element("#bookTable");
            callback();
        }, 4*1000)
    });

    Then('I should see the books mentioning the city', function(callback) {
        setTimeout(function(){
            browser.assert.element("#bookTable");
            callback();
        }, 4*1000)
    });

    Then('I should see a map with nearby cities', function(callback) {
        setTimeout(function(){
            browser.assert.element("#citiesVicinityTableTable");
            callback();
        }, 4*1000)
    });

    Then('I should see list of the books that mentioned the cities', function(callback) {
        setTimeout(function(){
            browser.assert.element("#bookTable");
            callback();
        }, 4*1000)
    });

    Then('I should see the authors of the books', function(callback) {
        setTimeout(function(){
            browser.assert.element("#bookAuthorTable");
            callback();
        }, 4*1000)
    });
});
