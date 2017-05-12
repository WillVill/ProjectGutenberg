var seleniumDriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
	Given('I am doing something', function() {
		return this.driver.get('localhost:8080');
	});

	When('I click on "something"', function (text) {
		return this.driver.findElemtn({something: text}).then(function(element) {
			return element.click();
		});
	});

	Then('I should see "something"', function (text) {
		return this.driver.wait(condition, 5000);
	});
})
