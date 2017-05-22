'use strict';
var {defineSupportCode} = require('cucumber');
var seleniumDriver = require('selenium-webdriver');

defineSupportCode(function({Given, When, Then}) {
		Given I am a user of the web application
		And I click "Get nearby cities"
		Then I should see a map with nearby cities
		And I should see list of the books that mentioned the cities
	// Given('the list of authors', function(callback) {
	// 	callback(null, 'pending');
	// 	assert.equal(authors.getAll().length, 3, 'Author list should have three authors');
	// 	callback();
	// });

	// Given('the list of books', function(callback) {
	// 	callback(null, 'pending');
	// 	assert.equal(books.getAll().length, 12, 'Book list should have 12 books');
	// 	callback();
	// });

	// Given('the list of cities', function(callback) {
	// 	callback(null, 'pending');
	// 	assert.equal(cities.getAll().length, 12, 'Cities list should have 12 cities');
	// 	callback();
	// });

	Given('I am a user of the web application', function(callback) {
		callback(null, 'pending');
		assert.equal(authors.getAll().length, 3, 'Author list should have three authors');
		callback();
	});

	// When('I select {stringInDoubleQuotes}', function(callback) {
	// 	callback(null, 'pending');
	// 	return this.driver.findElemtn({something: text}).then(function(element) {
	// 		return element.click();
	// 	});
	// });

	When('I select author {stringInDoubleQuotes}', function(callback) {
		callback(null, 'pending');
		return this.driver.findElemtn({something: text}).then(function(element) {
			return element.click();
		});
	});

	When('I select city {stringInDoubleQuotes}', function(callback) {
		callback(null, 'pending');
		return this.driver.findElemtn({something: text}).then(function(element) {
			return element.click();
		});
	});

	When('I select book {stringInDoubleQuotes}', function(callback) {
		callback(null, 'pending');
		return this.driver.findElemtn({something: text}).then(function(element) {
			return element.click();
		});
	});

	And('I click {stringInDoubleQuotes}', function(callback) {
		callback(null, 'pending');
		return this.driver.findElemtn({something: text}).then(function(element) {
			return element.click();
		});
	});

	Then('I should see the books written by the author', function(callback) {
		callback(null, 'pending');
		return this.driver.wait(condition, 5000);
	});

	And('I should see the cities mentioned in the books', function(callback) {
		callback(null, 'pending');
		return this.driver.wait(condition, 5000);
	});

	And('I should see the cities plotted on a map', function(callback) {
		callback(null, 'pending');
		return this.driver.wait(condition, 5000);
	});

	Then('I should see the books mentioning the city', function(callback) {
		callback(null, 'pending');
		return this.driver.wait(condition, 5000);
	});

	Then('I should see a map with nearby cities', function(callback) {
		callback(null, 'pending');
		return this.driver.wait(condition, 5000);
	});

	And('I should see list of the books that mentioned the cities', function(callback) {
		callback(null, 'pending');
		return this.driver.wait(condition, 5000);
	});

	Then('I should see the authors of the books', function(callback) {
	    callback(null, 'pending');
		return this.driver.wait(condition, 5000);
	});

});
