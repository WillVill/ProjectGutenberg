require('chromedriver');
var seleniumWebDriver = require('selenium-webdriver');
var {defineSupportCode} = require('cucumber');

function() {
	this.driver = new seleniumWebDriver.Builder()
		.forBrowser('chrome')
		.build();
}

defineSupportCode(fucntion({setWorldConstructor}) {
	setWorldConstructor(CustomWorld);
})
